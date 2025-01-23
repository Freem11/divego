import React from 'react';
import screenData from '../screenData.json';
import Button from '../../reusables/button';
import style from './style.module.scss';

type ConfirmDeleteAccountViewProps = {
  onClose:     () => void
  onDelete:    () => void
  onContactUs: () => void
};

export default function DiveSiteView({ onClose, onContactUs, onDelete }: ConfirmDeleteAccountViewProps) {
  return (
    <div className="flex-column-between full-height p-8">
      <div className="columns">
        <div className="d-flex">
          <h1 className="text-clip uppercase">{screenData.ConfirmDeleteAccount.title}</h1>
        </div>
      </div>
      <div>

        <div className="columns">
          <div className="column col-12">
            <h3 className="text-gray">{screenData.ConfirmDeleteAccount.subHeader}</h3>
          </div>
        </div>
        <p className="text-gray">{screenData.ConfirmDeleteAccount.body}</p>
      </div>
      <div className={style.horizontalButtonContainer}>
        <div className="col-3">
          <Button
            onClick={() => onDelete()}
            className="btn-md "
            type="button"
          >
            {screenData.ConfirmDeleteAccount.deleteBtnText}
          </Button>
        </div>
        <div className="col-3">

          <Button
            onClick={() => onClose()}
            className="btn-md bg-primary"
            type="button"
          >
            {screenData.ConfirmDeleteAccount.cancelBtnText}
          </Button>
        </div>
        <div className="col-3">
          <Button
            onClick={() => onContactUs()}
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
