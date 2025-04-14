import React, { useContext } from 'react';
import { MapContext } from '../../mapContext';
import { ModalContext } from '../../../reusables/modal/context';
import Button from '../../../reusables/button';
import { useTranslation } from 'react-i18next';

export function ReturnToSiteSubmitterButton() {
  const { setMapConfig } = useContext(MapContext);
  const { modalResume } = useContext(ModalContext);
  const { t } = useTranslation();

  return (
    <Button
      className="btn-md bg-primary"
      type="button"
      onClick={() => {
        modalResume();
        setMapConfig(0);
      }}
    >
      {t('GoogleMap.pinButton')}
    </Button>
  );
}
