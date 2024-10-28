const fs = require('fs').promises;
const { parseSvgContent } = require('./svg-parser/parser');
const { buildHtml } = require('./svg-parser/html-builder');


const svgDir = './svg';
const configPath = './_config.json';
const previewPath = './index.html';


const processIcons = async () => {
  const config = {};
  const files = await fs.readdir(svgDir);
  buildHtml(files, previewPath);
  for (const file of files) {
    const iconName = file.replace('.svg', '');
    const svgContent = await fs.readFile(`${svgDir}/${file}`, 'utf8');
    const [viewBox, figure] = parseSvgContent(svgContent);
    config[iconName] = [viewBox, figure];
  }

  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
};


(async () => {
  await processIcons();
})();
