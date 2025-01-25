import React from 'react';
import backGroundPic from '../../../images/boat.png';
import screenData from '../screenData.json';
import Button from '../../reusables/button';
import style from './style.module.scss';
import WavyModalHeader from '../../reusables/wavyModalHeader';

type ConfirmDeleteAccountViewProps = {
  onClose:     () => void
  onDelete:    () => void
  onContactUs: () => void
};

export default function DiveSiteView(props: ConfirmDeleteAccountViewProps) {
  return (
    <div className="flex-column-between full-height p-8">
      <WavyModalHeader image={backGroundPic} />
      <div className="columns">
        <div className="d-flex ml-8">
          <h1 className="text-clip uppercase">{screenData.ConfirmDeleteAccount.title}</h1>
        </div>
      </div>
      <div>

        <div className="columns">
          <div className="column col-12 px-8">
            <h3 className={style.subHeader}>{screenData.ConfirmDeleteAccount.subHeader}</h3>
          </div>
        </div>
        <p className="text-gray px-8">{screenData.ConfirmDeleteAccount.body}</p>
      </div>
      <div className={style.horizontalButtonContainer}>
        <div className="col-3">
          <Button
            onClick={() => props.onDelete()}
            className="btn-md "
            type="button"
          >
            {screenData.ConfirmDeleteAccount.deleteBtnText}
          </Button>
        </div>
        <div className="col-3">

          <Button
            onClick={() => props.onClose()}
            className="btn-md bg-primary"
            type="button"
          >
            {screenData.ConfirmDeleteAccount.cancelBtnText}
          </Button>
        </div>
        <div className="col-3">
          <Button
            onClick={() => props.onContactUs()}
            className="btn-md bg-primary"
            type="button"
          >
            {screenData.ConfirmDeleteAccount.contact}
          </Button>
        </div>
      </div>
    </div>
  );
}
