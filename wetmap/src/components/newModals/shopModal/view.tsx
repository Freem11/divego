import React, { useState, useContext, useEffect, useRef } from 'react';
import Itinerary from '../../itineraries/itinerary';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ShopModalContext } from '../../contexts/shopModalContext';
import { MasterContext } from '../../contexts/masterContext';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../../contexts/zoomHelperContext';
import { shops } from '../../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../../closeButton/closeButton';
import shopModalView from './view';
import PlainTextInput from '../../reusables/plainTextInput';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import { DiveShop } from '../../../entities/diveShop';


type ShopModelViewProps = {
  diveShop: DiveShop | null
  isPartnerAccount:     boolean
  // shopModelName: string | null
  // shopDescription: string | null
  onClose: () => void
  onDiveShopBioChange:  (newValue: string) => void
};

export default function ShopModalView(props: ShopModelViewProps) {
  // const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  // const [siteCloseState, setSiteCloseState] = useState(false);
  const [itineraryList, setItineraryList] = useState('');
  const [selectedID, setSelectedID] = useState(null);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  useEffect(() => {
    if (selectedShop[0]) {
      getItineraries(selectedShop[0].id);
      setMasterSwitch(true);
    }
  }, [selectedShop]);

  useEffect(() => {
    if (shopModal && zoomHelper) {
      setMapCoords([selectedShop[0].lat, selectedShop[0].lng]);
    }
  }, [shopModal]);

  const getItineraries = async (IdNum) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins.length > 0) {
        setItineraryList(itins);
      }
    }
    catch (e) {
      console.log({ title: 'Error', message: e.message });
    }
  };

  // const handleShopModalClose = () => {
  //   setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
  //   setItineraryList('');
  //   setShopModal(false);
  // };
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <div className="cols mx-0 full-height">
      <input
        ref={fileUploaderRef}
        className="d-hide"
        type="file"
        onChange={props.handleImageSelection}
      />
      <div className="col-6">
        {/* Test 1 */}
        <WavyModalHeader image={props.headerPictureUrl || defaultHeaderPicture} onClose={props.onClose}>
          <div className={style.buttonImageUpload}>
            <ButtonIcon
              icon={<Icon name="camera-plus" />}
              className="btn-lg"
              onClick={() => fileUploaderRef?.current?.click?.()}
            />
          </div>
          {/* <div className={style.buttonImageUpload}>
            <ButtonIcon
              icon={<Icon name="camera-plus" />}
              className="btn-lg"
              onClick={() => fileUploaderRef?.current?.click?.()}
            />
          </div> */}
        </WavyModalHeader>
        <div className="ml-6">
          <div className="stack-4">
            <div>
              <div className="d-flex">
                <h1 className="mb-0">{props?.diveShop.orgName}</h1>
              </div>

              {/* <div className="d-flex">
                {'Added by: '}
                <a href="#">{props?.diveSite?.newusername}</a>
              </div> */}
            </div>

            <div className="panel border-none">
              <div className="panel-body">
                <PlainTextInput
                  placeHolder={`A little about ${props?.diveShop?.orgName}`}
                  content={props?.diveShop?.diveShopBio || ''} // diveShopBio doesn't exist yet.
                  readOnly={!props?.isPartnerAccount}
                  onSubmit={props?.onDiveShopBioChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <h3 class="text-left">{props?.shopDescription}</h3>
        </div>
      </div>
      <div className="col-6 panel border-none full-height">
        <div className="panel-header">
          <h3>Offered Diving Trips</h3>
          <Button className="mt-2 btn-lg">
                Add diving event
                {/* <span className="hide-sm">{screenData.DiveSite.addSightingButton}</span> */}
          </Button>
        </div>
        <div className={`${style.itineraryList}`}>
          {itineraryList// in the future, if itineraryList is not empty, render a loading spinner
            && itineraryList.map((itinerary) => {
              return (
                <Itinerary
                  key={itinerary.id}
                  itinerary={itinerary}
                  setSelectedID={setSelectedID}
                  selectedID={selectedID}
                  setShopModal={setShopModal}
                />
              );
            })}
          {itineraryList.length === 0 && (
            <div>
              <p className="noSightings">
                No Trips are currently being offered.
              </p>
            </div>
          )}
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}