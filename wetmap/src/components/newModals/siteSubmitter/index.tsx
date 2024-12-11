import React from 'react';
import SiteSubmitterView from './view';


export default function DiveSite(props) {
  return (
    <SiteSubmitterView
      onSubmit={(data) => {
        console.log({ data });
      }}
    />
  );
}
