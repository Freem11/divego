import React from 'react';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import ShopCardList from '../../shopCardList';
import { DiveShop } from '../../../entities/diveShop';

type ShopsListViewProps = {
  onClose?:        () => void
  listOfShops:     DiveShop[] | null
  openTripCreator: () => void
};

export default function ShopsListView(props: ShopsListViewProps) {
  return (
    <div className="cols mx-0 full-height">

      <div className="col-12 panel border-none full-height">
        <WavyModalHeader image={defaultHeaderPicture} onClose={props.onClose}>
        </WavyModalHeader>
        <div className="panel-header">
          <h3>My Dive Centers</h3>
          <div className={`${style.buttonAddDivingEvents}`}>
            <Button
              className="mt-2 btn-lg"
            //  onClick={props.openTripCreator}
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
