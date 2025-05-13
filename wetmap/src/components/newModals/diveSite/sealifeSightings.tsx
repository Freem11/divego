import React from 'react';
import SeaLifeImageCardList from '../../reusables/seaLifeCardList';
import screenData from '../screenData.json';
import style from './style.module.scss';
import Button from '../../reusables/button';
import { DiveSiteViewProps } from './type';

export function SealifeSightings(props: DiveSiteViewProps) {
  return (
    <div className="col-6 panel border-none full-height">
      <div className={style.panelHeader}>
        <h3>{screenData.DiveSite.drawerHeader}</h3>
        <div className={style.addPictureButton}>
          {props.showPicUploaderButton
          && (
            <Button className="btn-lg" onClick={props.openPicUploader}>
              <span className="hide-sm">
                {screenData.DiveSite.addSightingButton}
              </span>
            </Button>
          ) }

        </div>
      </div>
      <SeaLifeImageCardList diveSitePics={props.diveSitePics} />
    </div>
  );
};
