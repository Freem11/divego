const fs = require('fs').promises;


const buildHtml = async (svgs, targetPath) => {
  const template = await fs.readFile(`./svg-parser/template.html`, 'utf8');
  let content = '';
  for (const svg of svgs) {
    content += `<div class='icon-def'>
        <span class='icon-img'><img src = "./svg/${svg}"/></span>
        <span class='icon-name'>${svg}</span>
        </div>`;
  }

  fs.writeFile(targetPath, template.replace('{content}', content));
};

module.exports = { buildHtml };
