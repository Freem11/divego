import React from 'react';
import screenData from '../screenData.json';
import Button from '../../reusables/button';
import style from './style.module.scss';

type ConfirmDeleteAccountViewProps = {
  onClose?: () => void
};

export default function DiveSiteView(props: ConfirmDeleteAccountViewProps) {
  return (
    <div className="flex-column-between full-height grid-lg text-center p-2">


      <div className="columns">
        <div className="column col-12">
          <h1 className="text-primary">{screenData.ConfirmDeleteAccount.title}</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column col-12">
          <h3 className="text-secondary">{screenData.ConfirmDeleteAccount.subHeader}</h3>
        </div>
      </div>
      <p className="text-gray">{screenData.ConfirmDeleteAccount.body}</p>
      <div className={style.horizontalButtonContainer}>
        <div className="col-3">
          <Button
            onClick={() => {}}
            className="btn-md bg-error"
            type="button"
          >
            {screenData.ConfirmDeleteAccount.deleteBtnText}
          </Button>
        </div>
        <div className="col-3">

          <Button
            onClick={() => {}}
            className="btn-md"
            type="button"
          >
            {screenData.ConfirmDeleteAccount.cancelBtnText}
          </Button>
        </div>
        <div className="col-3">
          <Button
            onClick={() => {}}
            className="btn-md"
            type="button"
          >
            {screenData.ConfirmDeleteAccount.contact}
          </Button>
        </div>
      </div>
    </div>
  );
}
