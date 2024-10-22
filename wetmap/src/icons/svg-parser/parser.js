const getSvgAttribute = (attribute, content) => {
  const regex = new RegExp(`<svg.*?${attribute}\s?=\s?"(.*?)"`);
  const match = regex.exec(content);
  if (!match || match[1] === undefined) {
    return null;
  }

  return match[1];
};

const getSvgFigure = (content) => {
  const regex = new RegExp(`<svg.*?>(.*)<\/svg>`, 'ms');
  const match = regex.exec(content);
  if (!match || match[1] === undefined) {
    return null;
  }

  return match[1];
};

const parseSvgContent = (content) => {
  let viewBox = getSvgAttribute('viewBox', content);
  let figure = getSvgFigure(content);

  if (viewBox) {
    viewBox = viewBox.split(' ').map(coord => parseInt(coord)).join(' ');
  } else {
    viewBox = '';
  }

  if (figure) {
    figure = figure.replaceAll('\n', '');
    figure = figure.replaceAll(/\s+/g, ' ');
    figure = figure.replaceAll(/>\s+</g, '><');
    figure = figure.replaceAll(/,\s+/g, ',');
    return [viewBox, figure];
  }
};

module.exports = { parseSvgContent };