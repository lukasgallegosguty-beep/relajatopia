#!/usr/bin/env python3
"""Genera los audios de voz de las sesiones con Kokoro, un modelo abierto (Apache 2.0).

Requisitos:
  pip install kokoro-onnx soundfile numpy
  Descargar kokoro-v1.0.int8.onnx y voices-v1.0.bin desde
  https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
  ffmpeg instalado.

Uso:
  python3 herramientas/generar_voz.py --modelos CARPETA_DE_MODELOS

Solo genera las frases que todavía no tienen audio, así que después de editar un
guion basta con volver a ejecutarlo. Las frases que ya no se usan se eliminan.
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "audio" / "voz"
MANIFIESTO = RAIZ / "js" / "content" / "voz-clips.js"
VOZ = "ef_dora"
VELOCIDAD = 0.86
IDIOMA = "es-419"  # español latinoamericano, sin ceceo
# Ritmo final de unos 13 caracteres por segundo, más pausado que una lectura normal.
FILTROS = "atempo=0.87,alimiter=limit=0.89:level=false"

# Cómo se escribe para la voz lo que se leería mal tal cual.
PRONUNCIACION = {
    "Viktor Frankl": "Víctor Fránkel",
}


def frases():
    res = subprocess.run(
        ["node", str(RAIZ / "herramientas" / "lineas-voz.mjs")],
        check=True, capture_output=True, text=True, cwd=RAIZ,
    )
    return json.loads(res.stdout)


def para_voz(txt):
    for a, b in PRONUNCIACION.items():
        txt = txt.replace(a, b)
    return txt


def recortar_silencio(muestras, sr, umbral=0.004):
    fuerte = np.where(np.abs(muestras) > umbral)[0]
    if len(fuerte) == 0:
        return muestras
    ini = max(0, fuerte[0] - int(0.03 * sr))
    fin = min(len(muestras), fuerte[-1] + int(0.12 * sr))
    return muestras[ini:fin]


def preparar(muestras, sr):
    muestras = recortar_silencio(muestras, sr)
    pico = np.max(np.abs(muestras)) or 1.0
    muestras = muestras / pico * 0.82
    borde = int(0.02 * sr)
    muestras[:borde] *= np.linspace(0, 1, borde)
    muestras[-borde:] *= np.linspace(1, 0, borde)
    return muestras


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--modelos", required=True, type=Path)
    ap.add_argument("--limite", type=int, default=0, help="genera solo N frases, para probar")
    args = ap.parse_args()

    SALIDA.mkdir(parents=True, exist_ok=True)
    lista = frases()
    vigentes = {f["clave"] for f in lista}
    for viejo in SALIDA.glob("*.m4a"):
        if viejo.stem not in vigentes:
            viejo.unlink()

    kokoro = Kokoro(str(args.modelos / "kokoro-v1.0.int8.onnx"), str(args.modelos / "voices-v1.0.bin"))
    pendientes = [f for f in lista if not (SALIDA / f"{f['clave']}.m4a").exists()]
    if args.limite:
        pendientes = pendientes[: args.limite]
    print(f"{len(lista)} frases, {len(pendientes)} por generar", flush=True)

    with tempfile.TemporaryDirectory() as tmp:
        for i, f in enumerate(pendientes, 1):
            muestras, sr = kokoro.create(para_voz(f["txt"]), voice=VOZ, speed=VELOCIDAD, lang=IDIOMA)
            muestras = preparar(np.asarray(muestras, dtype=np.float32), sr)
            wav = Path(tmp) / "x.wav"
            sf.write(wav, muestras, sr)
            subprocess.run(
                ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-af", FILTROS, "-ac", "1", "-c:a", "aac", "-b:a", "48k",
                 "-movflags", "+faststart", str(SALIDA / f"{f['clave']}.m4a")],
                check=True,
            )
            if i % 25 == 0:
                print(f"{i}/{len(pendientes)}", flush=True)

    duraciones = {}
    for f in lista:
        ruta = SALIDA / f"{f['clave']}.m4a"
        if not ruta.exists():
            continue
        res = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(ruta)],
            check=True, capture_output=True, text=True,
        )
        duraciones[f["clave"]] = round(float(res.stdout.strip()), 2)

    cuerpo = ",\n".join(f"  '{k}': {v}" for k, v in sorted(duraciones.items()))
    MANIFIESTO.write_text(
        "// Audios pregrabados disponibles: huella del texto → duración en segundos.\n"
        "// Lo genera herramientas/generar_voz.py. Si está vacío, la app usa la voz del teléfono.\n"
        "export const CLIPS = {\n" + cuerpo + ",\n};\n",
        encoding="utf8",
    )
    print(f"listo: {len(duraciones)} audios", flush=True)


if __name__ == "__main__":
    main()
