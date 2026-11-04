// Genera los íconos PNG desde iconos/icono.svg. Uso: node herramientas/generar-iconos.cjs
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const raiz = path.join(__dirname, '..');
const svg = fs.readFileSync(path.join(raiz, 'iconos/icono.svg'), 'utf8');
// Versión de bordes rectos: Android recorta el ícono con su propia máscara.
const cuadrado = svg.replace('rx="112"', 'rx="0"').replace('M0 268h512v132a112 112 0 0 1-112 112H112A112 112 0 0 1 0 400z', 'M0 268h512v244H0z');
// En la versión con máscara, el motivo se reduce para quedar dentro de la zona segura.
const mascara = cuadrado
  .replace('<circle', '<g transform="translate(256 256) scale(.74) translate(-256 -256)"><circle')
  .replace('<path d="M0 268h512v244H0z" fill="#0A4A54"/>', '')
  .replace('</svg>', '</g></svg>')
  .replace('<rect x="0" y="264" width="512" height="8" fill="#BFE7E4"/>', '')
  .replace('<rect width="512" height="512" rx="0" fill="#0E7479"/>', '<rect width="512" height="512" fill="#0E7479"/><rect y="268" width="512" height="244" fill="#0A4A54"/>');

(async () => {
  const b = await chromium.launch();
  const render = async (contenido, tam, nombre) => {
    const p = await b.newPage({ viewport: { width: tam, height: tam } });
    await p.setContent(`<!doctype html><style>*{margin:0}svg{display:block;width:${tam}px;height:${tam}px}body{background:transparent}</style>${contenido}`);
    await p.screenshot({ path: path.join(raiz, 'iconos', nombre), omitBackground: true });
    await p.close();
  };
  await render(cuadrado, 180, 'apple-touch-icon.png');
  await render(svg, 192, 'icono-192.png');
  await render(svg, 512, 'icono-512.png');
  await render(mascara, 512, 'icono-mascara-512.png');
  await b.close();
})();
