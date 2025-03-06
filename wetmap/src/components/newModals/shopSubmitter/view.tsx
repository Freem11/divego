import React from 'react';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';

type ShopSubmitterViewProps = {
  onClose: () => void
};

export default function ShopSubmitterView({ onClose }: ShopSubmitterViewProps) {
  return (
    <div className="full-height">
      <WavyModalHeader image={backGroundPic} onClose={onClose} />
      <div>
        <h2>Additional Dive Center functionality coming soon!</h2>
      </div>
    </div>
  );
}
