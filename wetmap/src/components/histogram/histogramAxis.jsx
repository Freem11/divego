import React from 'react';
import './histogram.css';

export default function AxisBar() {
  return (
    <div className="monthContainer" pointerEvents="none">
      <div className="axisLine" pointerEvents="none"></div>
      <div className="months" pointerEvents="none">
        <h3 className="letter">J</h3>
        <h3 className="letter">F</h3>
        <h3 className="letter">M</h3>
        <h3 className="letter">A</h3>
        <h3 className="letter">M</h3>
        <h3 className="letter">J</h3>
        <h3 className="letter">J</h3>
        <h3 className="letter">A</h3>
        <h3 className="letter">S</h3>
        <h3 className="letter">O</h3>
        <h3 className="letter">N</h3>
        <h3 className="letter">D</h3>
      </div>
    </div>
  );
}
