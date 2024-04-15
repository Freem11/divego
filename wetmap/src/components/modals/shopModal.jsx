
import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import Itinerary from "../itineraries/itinerary";
import { itineraries } from "../../supabaseCalls/itinerarySupabaseCalls";
import { SelectedShopContext } from "../contexts/selectedShopContext";
import { ShopModalContext } from "../contexts/shopModalContext";
import { MasterContext } from "../contexts/masterContext";
import { CoordsContext } from "../contexts/mapCoordsContext";
import { ZoomHelperContext } from "../contexts/zoomHelperContext";
import CloseIcon from "@mui/icons-material/Close";

import "./shopModal.css";
import { shops } from "../../supabaseCalls/shopsSupabaseCalls";

export default function ShopModal(props) {
  // const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const [siteCloseState, setSiteCloseState] = useState(false);
  const [itineraryList, setItineraryList] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  useEffect(() => {
    if (selectedShop[0]) {
      getItineraries(selectedShop[0].id);
      setMasterSwitch(true)
    }
  }, [selectedShop]);


  useEffect(() => {
    if (shopModal && zoomHelper) {
      setMapCoords({
      lat: selectedShop[0].lat,
      lng: selectedShop[0].lng,
    });
    }
  }, [shopModal]);

  const getItineraries = async (IdNum) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins.length > 0) {
        setItineraryList(itins);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  console.log(itineraryList)
  const handleShopModalClose = () => {
    setSelectedShop({ ...selectedShop, id: 0, orgName: "" });
    setItineraryList("");
    setShopModal(false);
  };

  return (
    <div
      style={{
        height: "98%",
        // backgroundColor: "orange",
        overflow: "hidden",
      }}
    >
      <div className="titleAlt">
        <div>
          <h3 className="headerAlt">
            {selectedShop[0] && selectedShop[0].orgName}
          </h3>
        </div>
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => handleShopModalClose()}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon
              sx={{ color: "lightgrey", width: "2vw", height: "5vh" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>

      <div style={{ marginTop: "3%", width: "100%", borderRadius: 15 }}>
        <div className="container5">
          {itineraryList &&
            itineraryList.map((itinerary) => {
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
  );
}
