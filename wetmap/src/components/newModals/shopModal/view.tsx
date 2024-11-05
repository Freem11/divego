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
import './shopModal.css';
import { shops } from '../../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../../closeButton/closeButton';
import shopModalView from './view';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';

export default function ShopModalView(props) {
  // const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const [siteCloseState, setSiteCloseState] = useState(false);
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

  const handleShopModalClose = () => {
    setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
    setItineraryList('');
    setShopModal(false);
  };
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    // <div
    //   style={{
    //     height:   '98%',
    //     // backgroundColor: "orange",
    //     overflow: 'hidden',
    //   }}
    // >
    //   <div className="titleAlt">
    //     <div>
    //       <h3 className="headerAlt">
    //         {selectedShop[0] && selectedShop[0].orgName}
    //       </h3>
    //     </div>
    //     <CloseButton onClick={handleShopModalClose} />
    //   </div>

    //   <div style={{ marginTop: '3%', width: '100%', borderRadius: 15 }}>
    //     <div className="container5">
    //       {itineraryList
    //       && itineraryList.map((itinerary) => {
    //         return (
    //           <Itinerary
    //             key={itinerary.id}
    //             itinerary={itinerary}
    //             setSelectedID={setSelectedID}
    //             selectedID={selectedID}
    //             setShopModal={setShopModal}
    //           />
    //         );
    //       })}
    //       {itineraryList.length === 0 && (
    //         <div>
    //           <p className="noSightings">
    //             No Trips are currently being offered.
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>

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
      </div>
      <div className="col-6">
        {/* Test 2 */}
      </div>
    </div>
  );
}