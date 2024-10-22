import React from 'react';
import config from './_config.json';

type IconName = keyof typeof config;

type Props = {
  name: IconName
};


const Icon = (props: Props) => {
  if (!config) {
    console.error(`_config.json not found. Run "_build-svg.js" generate config.`);
    return;
  }

  const iconName = props.name;
  if (!iconName) {
    console.error(`icon name is required.`);
    return;
  }

  if (!(iconName in config)) {
    console.error(`icon "${iconName}" not found in _config.json. Run "_build-svg.js" to add new icons to the config.`);
    return;
  }

  const [viewBox, figure] = config[iconName];
  if (!figure) {
    console.error(`icon "${iconName}" is empty in _config.json. Config might be corrupted or svg file is invalid.`);
    return;
  }

  return (
    <svg
      {...props}
      {...(viewBox ? { viewBox } : {})}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: figure }}
    >
    </svg>
  );
};

export default Icon;
export type { IconName };
