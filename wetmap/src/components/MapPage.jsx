import React from "react";
import Homeo from "./Home";
import Home from "./googleMap";
import FormModal from "./modals/formModal";
import FormGuideModal from "./modals/formGuideModal";
import MonthSlider from "./Slider";
import AdminPortal from "./adminPortal";
import PicUploader from "./modals/picUploader";
import SiteSubmitter from "./modals/siteSubmitter";
import HowToGuide from "./modals/howToGuide";
import Settings from "./modals/setting";
import AnimalSearcher from "./AnimalSearch";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import Collapse from "@mui/material/Collapse";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { AnimalContext } from "./contexts/animalContext";
import { PicModalContext } from "./contexts/picModalContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { AnimalRevealContext } from "./contexts/animalRevealContext";
import { MasterContext } from "./contexts/masterContext";
import { LightBoxContext } from "./contexts/lightBoxContext";
import { SelectedPicContext } from "./contexts/selectPicContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import Lightbox from "react-image-lightbox";
import "./mapPage.css";

const animalSearchZone = (
  <div style={{ marginLeft: "10px", marginTop: "7px" }}>
    <AnimalSearcher></AnimalSearcher>
  </div>
);

const adminPortalZone = (
  <div style={{ marginLeft: "10px", marginBottom: "40px" }}>
    <AdminPortal></AdminPortal>
  </div>
);

const MapPage = React.memo(() => {
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const { animalVal } = useContext(AnimalContext);
  const { showGeoCoder, setShowGeoCoder } = useContext(GeoCoderContext);
  const { showAnimalSearch, setShowAnimalSearch } = useContext(
    AnimalRevealContext
  );
  const { lightbox, setLightbox } = useContext(LightBoxContext);
  const { selectedPic } = useContext(SelectedPicContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { picModal, setPicModal } = useContext(PicModalContext);

  const togglePicModal = () => {
    setPicModal(!picModal);
  };

  const [diveSiteModal, setDiveSiteModal] = useState(false);

  const toggleDiveSiteModal = () => {
    setDiveSiteModal(!diveSiteModal);
  };

  const [guideModal, setGuideModal] = useState(false);

  const toggleGuideModal = () => {
    setGuideModal(!guideModal);
  };

  const [gearModal, setGearModal] = useState(false);

  const toggleGearModal = () => {
    setGearModal(!gearModal);
  };

  const returnToPicModal = () => {
    setPicModal(true);
    setMasterSwitch(true);
  };

  const toggleButtonStyle = {
	"&.Mui-selected": { backgroundColor: "gold" },
	"&.Mui-selected:hover": { backgroundColor: "gold" },
	"&:hover": {
		//color: "#333",
		backgroundColor: "#3AAFB9"
	},
	backgroundColor: "#355d71",
	height: "48px",
	width:  "48px",
	border: "1px solid black",
	marginTop: "5px",
	color: "white",
	boxShadow: "-2px 4px 4px #00000064",
	borderRadius: "100%"
  }

  return (
    <div className="mappagemaster">
		{masterSwitch && (
			<div className="col2rowT">
				<div className="sliderDiv">
					<MonthSlider />
				</div>

				<div className="selectorDiv">Selected: {animalVal}</div>
			</div>
		)}

    <div className="just-testing">
      {masterSwitch && (<div
        className="col1row2"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={showGeoCoder}
          onChange={() => {
            setShowGeoCoder(!showGeoCoder);
          }}
        >
          <ExploreIcon />
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div
        className="col1row3"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={showAnimalSearch}
          onChange={() => {
            setShowAnimalSearch(!showAnimalSearch);
          }}
        >
          <SearchIcon />
        </ToggleButton>
        <Collapse
          in={showAnimalSearch}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {animalSearchZone}
        </Collapse>
      </div>)}

      {masterSwitch && ( <div className="col1row4">
        {" "}
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={divesTog}
          onChange={() => {
            setDivesTog(!divesTog);
          }}
        >
          <AnchorIcon />
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div className="col1row5">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={picModal}
          onChange={() => {
            setPicModal(togglePicModal);
          }}
        >
          <PhotoCameraIcon />
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div className="col1row6">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={diveSiteModal}
          onChange={() => {
            setDiveSiteModal(toggleDiveSiteModal);
          }}
        >
          <AddLocationAltIcon />
        </ToggleButton>
      </div>)}

      {masterSwitch && (<div className="col1row7">
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          selected={guideModal}
          onChange={() => {
            setGuideModal(toggleGuideModal);
          }}
        >
          <QuestionMarkIcon />
        </ToggleButton>
      </div>)}
	  </div>
      {/* {masterSwitch && (<div className="col1row8">
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "pink" },
            "&.Mui-selected:hover": { backgroundColor: "pink" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
          }}
          value="check"
          selected={gearModal}
          onChange={() => {
            setGearModal(toggleGearModal);
          }}
        >
          <SettingsIcon />
        </ToggleButton>
      </div>)} */}

      <div className="col1rowB">
        <Collapse
          in={showAdminPortal}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {adminPortalZone}
        </Collapse>
        <Homeo
          setShowAdminPortal={setShowAdminPortal}
          showAdminPortal={showAdminPortal}
        />
      </div>

      {/* masterSwitch && (<div className="col2rowB">Selected: {animalVal}</div>) */}

     <div>
        <Home
          style={{
            // position: "absolute",
            zIndex: "1",
            height: "100%",
          }}
        ></Home>
      </div>

      <div className="just-testing2">
      <div
        className="colXrow1"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          onClick={() => {
            setMapZoom(mapZoom + 1);
          }}
        >
          <AddIcon />
        </ToggleButton>
      </div>

      <div
        className="colXrow2"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={ toggleButtonStyle }
          value="check"
          onClick={() => {
            setMapZoom(mapZoom - 1);
          }}
        >
          <RemoveIcon />
        </ToggleButton>
        </div>
        </div>

      {!masterSwitch && (<div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          width: "90%",
          marginLeft: "10%",
          top: "5px",
          zIndex: "2",
        }}
      >
        <div
          style={{
            width: "90%",
            position: "relative",
            zIndex: "2",
          }}
        >
          <Button
            onClick={returnToPicModal}
            sx={{
              "&:hover": { backgroundColor: "lightblue" },
              color: "#9B884E",
              fontFamily: "Permanent Marker, cursive",
              fontSize: '15px',
              width: '10%',
              height: "80%",
              textAlign: "center",
              backgroundColor: "#355D71",
              marginTop: "5px",
            }}
          >
            Set Pin
          </Button>
        </div>
      </div>)}

      <FormModal openup={picModal} closeup={togglePicModal}>
        <PicUploader closeup={togglePicModal} />
      </FormModal>

      <FormModal openup={diveSiteModal} closeup={toggleDiveSiteModal}>
        <SiteSubmitter closeup={toggleDiveSiteModal} />
      </FormModal>

      <FormGuideModal openup={guideModal} closeup={toggleGuideModal}>
        <HowToGuide closeup={toggleGuideModal} />
      </FormGuideModal>


      <FormModal openup={gearModal} closeup={toggleGearModal}>
        <Settings closeup={toggleGearModal} />
      </FormModal>

      {lightbox && (
          <Lightbox
            mainSrc={selectedPic}
            onCloseRequest={() => setLightbox(false)}
          />
        )}
    </div>
  );
});

export default MapPage;
