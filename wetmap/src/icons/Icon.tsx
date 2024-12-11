import React, { ReactElement } from 'react';
import config from './_config.json';

type IconName = keyof typeof config;

type Props = {
  name:       IconName
};
type viewBoxEncoded = string | number | null | Array<number>;

const getFigure = (content: string): ReactElement | null => {
  if (!content) {
    return null;
  }

  if (content.startsWith('<')) {
    return <g dangerouslySetInnerHTML={{ __html: content }}></g>;
  } else {
    return <path d={content}></path>;
  }
};

const getViewBox = (data: viewBoxEncoded): string => {
  let result = '';
  if (!data) {
    return result;
  }

  if (Array.isArray(data)) {
    if (data.length === 1) {
      result = `0 0 ${data[0]} ${data[0]}`;
    }
    if (data.length === 2) {
      result = `0 0 ${data[0]} ${data[1]}`;
    }
    if (data.length === 4) {
      result = data.join(' ');
    }
  }

  if (typeof data === 'string') {
    result = data;
  }

  if (typeof data === 'number') {
    result = `0 0 ${data} ${data}`;
  }

  return result;
};


const Icon = (props: Props & React.SVGAttributes<SVGElement>) => {
  if (!config) {
    console.error(`_config.json not found. Run "_build-svg.js" generate config.`);
    return <></>;
  }

  const { className, ...restProps } = props;
  const iconName = props.name;
  if (!iconName) {
    console.error(`icon name is required.`);
    return <></>;
  }

  if (!(iconName in config)) {
    console.error(`icon "${iconName}" not found in _config.json. Run "_build-svg.js" to add new icons to the config.`);
    return <></>;
  }

  const viewBox = getViewBox(config[iconName][0]);
  const figure = getFigure(String(config[iconName][1]));
  if (!figure) {
    console.error(`icon "${iconName}" is empty in _config.json. Config might be corrupted or svg file is invalid.`);
    return <></>;
  }

  return (
    <svg
      {...(viewBox ? { viewBox } : {})}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={`icon ${className || ''}`}
      {...restProps}
    >
      {figure}
    </svg>
  );
};

export default Icon;
export type { IconName, Props };
