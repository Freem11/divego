import React from 'react';
import Button from '../../reusables/button';
import style from './style.module.scss';
import ShopCardList from '../../shopCardList';
import { DiveShop } from '../../../entities/diveShop';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';

type ShopsListViewProps = {
  onClose?:                () => void
  listOfShops:             DiveShop[] | null
  openTripCreator:         () => void
  openDiveCenterSubmitter: () => void
};

export default function ShopsListView(props: ShopsListViewProps) {
  return (
    <div className="cols mx-0 full-height">
      <ButtonIcon
        icon={<Icon name="chevron-left" />}
        className={`btn-lg text-gray ml-4 mt-4 ${style.buttonBack}`}
        onClick={props.onClose}
      />
      <div className="col-12 panel border-none full-height">

        <div className="panel-header">
          <h3>My Dive Centers</h3>
          <div className={`${style.buttonAddDivingEvents}`}>
            <Button
              className="mt-2 btn-lg"
              onClick={props.openDiveCenterSubmitter}
            >
              Add a new location
            </Button>
          </div>
        </div>
        <ShopCardList shopList={props.listOfShops} />
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
