import React from 'react';

type combineComponentsProps = {
  children?: React.ReactNode
};

export const combineComponents = (props: combineComponentsProps) => {
  const { children, ...components } = props;
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};
