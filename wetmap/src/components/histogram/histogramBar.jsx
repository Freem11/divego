import React from 'react';
import './histogram.css';

let heightVal;
export default function DataBar(props) {
  const { moddedVal } = props;

  heightVal = moddedVal;
  return (
    <div className="barContainer" style={{ height: moddedVal + '%' }} pointerEvents="none">
    </div>
  );
}
