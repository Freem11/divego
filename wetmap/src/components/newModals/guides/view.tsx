import React from 'react';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import { useTranslation } from 'react-i18next';

type GuidesModalViewProps = {
  onClose: () => void
};

export default function GuidesModalView({ onClose }: GuidesModalViewProps) {
  const { t } = useTranslation();

  return (
    <div className="full-height">
      <WavyModalHeader image={backGroundPic} onClose={onClose} />
      <div>
        <h2>{t('UserGuide.comingSoon')}</h2>
      </div>
    </div>
  );
}
