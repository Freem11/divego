const getSvgAttribute = (attribute, content) => {
  const regex = new RegExp(`<svg.*?${attribute}\s?=\s?"(.*?)"`);
  const match = regex.exec(content);
  if (!match || match[1] === undefined) {
    return null;
  }

  return match[1];
};

const getSvgXml = (content) => {
  const regex = new RegExp(`<svg.*?>(.*)<\/svg>`, 'ms');
  const match = regex.exec(content);
  if (!match || match[1] === undefined) {
    return null;
  }

  let result = match[1];
  result = result.replaceAll('\n', '');
  result = result.replaceAll(/\s+/g, ' ');
  result = result.replaceAll(/>\s+</g, '><');
  result = result.replaceAll(/,\s+/g, ',');

  return result;
};

/**
 * If SVG consisists of only one path element, returns its path data
 * @param {*} xml
 * @returns string
 */
const getOptimizedPathData = (xml) => {
  const regex = new RegExp('^<path.*?d="(.*?)"/>$', 'ms');
  const match = regex.exec(xml);
  if (!match || match[1] === undefined) {
    return null;
  }

  return match[1];
};

const getSvgViewBox = (content) => {
  let viewBoxStr = getSvgAttribute('viewBox', content);
  if (!viewBoxStr) {
    return null;
  }

  let result = viewBoxStr.split(' ').map(coord => parseInt(coord));
  if (Array.isArray(result) && result.length === 4) {
    if (result[0] === 0 && result[1] === 0) {
      if (result[2] === result[3]) {
        return result[2];
      }

      return [result[2], result[3]];
    }

    return result;
  }
};

const parseSvgContent = (content) => {
  let viewBox = getSvgViewBox(content);
  let xml = getSvgXml(content);


  if (xml) {
    const pathData = getOptimizedPathData(xml);
    return [viewBox, (pathData || xml)];
  }
};

module.exports = { parseSvgContent };
