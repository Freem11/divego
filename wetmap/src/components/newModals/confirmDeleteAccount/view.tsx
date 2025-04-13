import React from 'react';
import backGroundPic from '../../../images/boat.png';
import Button from '../../reusables/button';
import style from './style.module.scss';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import { useTranslation } from 'react-i18next';

type ConfirmDeleteAccountViewProps = {
  onClose:     () => void
  onDelete:    () => void
  onContactUs: () => void
};

export default function ConfirmDeleteAccountView(props: ConfirmDeleteAccountViewProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic} />
      <div className="columns">
        <div className="d-flex ml-8">
          <h1 className="text-clip uppercase">{t('ConfirmDeleteAccount.title')}</h1>
        </div>
      </div>
      <div>

        <div className="columns">
          <div className="column col-12 px-8">
            <h3 className={style.subHeader}>{t('ConfirmDeleteAccount.subHeader')}</h3>
          </div>
        </div>
        <p className="text-gray px-8">{t('ConfirmDeleteAccount.body')}</p>
      </div>
      <div className={style.horizontalButtonContainer}>
        <div className="col-3">
          <Button
            onClick={() => props.onDelete()}
            className="btn-md "
            type="button"
          >
            {t('ConfirmDeleteAccount.deleteBtnText')}
          </Button>
        </div>
        <div className="col-3">

          <Button
            onClick={() => props.onClose()}
            className="btn-md btn-primary"
            type="button"
          >
            {t('ConfirmDeleteAccount.cancelBtnText')}
          </Button>
        </div>
        <div className="col-3">
          <Button
            onClick={() => props.onContactUs()}
            className="btn-md btn-primary"
            type="button"
          >
            {t('ConfirmDeleteAccount.contact')}
          </Button>
        </div>
      </div>
    </div>
  );
}
