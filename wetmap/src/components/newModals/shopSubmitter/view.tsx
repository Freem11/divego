import React from 'react';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import { useTranslation } from 'react-i18next';

type ShopSubmitterViewProps = {
  onClose: () => void
};

export default function ShopSubmitterView({ onClose }: ShopSubmitterViewProps) {
  const { t } = useTranslation();
  return (
    <div className="full-height">
      <WavyModalHeader image={backGroundPic} onClose={onClose} />
      <div>
        <h2>{t('SiteSubmitter.additionalCentersComing')}</h2>
      </div>
    </div>
  );
}
