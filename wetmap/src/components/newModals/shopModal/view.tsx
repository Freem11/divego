import React, { useState, useContext, useEffect, useRef } from 'react';
import Itinerary from '../../itineraries/itinerary';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ShopModalContext } from '../../contexts/shopModalContext';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../../contexts/zoomHelperContext';
import './shopModal.css';
import { shops } from '../../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../../closeButton/closeButton';
import shopModalView from './view';
import PlainTextInput from '../../reusables/plainTextInput';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';


type ShopModelViewProps = {
  shopModelName:   string | null
  shopDescription: string | null
};

export default function ShopModalView(props: ShopModelViewProps) {
  // const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  // const [siteCloseState, setSiteCloseState] = useState(false);
  const [itineraryList, setItineraryList] = useState('');
  const [selectedID, setSelectedID] = useState(null);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  useEffect(() => {
    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
  }, [selectedShop]);

  useEffect(() => {
    if (shopModal && zoomHelper) {
      setMapCoords([selectedShop.lat, selectedShop.lng]);
    }
  }, [shopModal]);

  const getItineraries = async (IdNum) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins.length > 0) {
        setItineraryList(itins);
      }
    } catch (e) {
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
          <div className={style.buttonOpenPictureUpload}>
            <Button
              className="btn-lg"
              onClick={props.openPicUploader}
            >
              add diving events here
              {/* <span className="hide-sm">{screenData.DiveSite.addSightingButton}</span> */}
            </Button>
          </div>

          <div className={style.buttonImageUpload}>
            <ButtonIcon
              icon={<Icon name="camera-plus" />}
              className="btn-lg"
              onClick={() => fileUploaderRef?.current?.click?.()}
            />
          </div>
        </WavyModalHeader>
        <div className="ml-6">
          <div className="stack-4">
            <div>
              <div className="d-flex">
                <h1 className="mb-0">{props?.shopModelName}</h1>
                <div>
                  <Icon
                    name="flag"
                    fill="maroon"
                    width="30px"
                    onClick={() => window.location = `mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20Dive%20Site:%20"${selectedDiveSite.SiteName}"%20at%20Latitude:%20${selectedDiveSite.Latitude}%20Longitude:%20${selectedDiveSite.Longitude}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Dive%20site%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20dive%20site%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Dive%20site%20GPS%20coordinates%20are%20not%20correct%0D%0A%0D%0A(Please%20provide%20a%20correct%20latitude%20and%20longitude%20and%20we%20will%20update%20the%20record)`}
                  />
                </div>
              </div>

              {/* <div className="d-flex">
                {'Added by: '}
                <a href="#">{props?.diveSite?.newusername}</a>
              </div> */}
            </div>
          </div>
        </div>
        <div className="ml-6">
          <h3 className="text-left">{props?.shopDescription}</h3>
        </div>
      </div>
      <div className="col-6">
        <h3>Offered Diving Trips</h3>
        <div style={{ marginTop: '3%', width: '100%', borderRadius: 15 }}>
          <div className="container5">
            {itineraryList
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
        </div>
      </div>
    </div>
  );
}
