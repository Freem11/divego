import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { SliderContext } from "../contexts/sliderContext";
import { AnimalContext } from "../contexts/animalContext";
import { AnchorModalContext } from "../contexts/anchorModalContext";
import { MapBoundsContext } from "../contexts/mapBoundariesContext";
import { IterratorContext } from "../contexts/iterratorContext";
import { TutorialContext } from "../contexts/tutorialContext"
import { ReverseContext } from "../contexts/reverseContext";;
import { useState, useContext, useEffect } from "react";
import { siteGPSBoundaries } from "../../helpers/mapHelpers";
import { getPhotosforAnchor, getPhotosforAnchorMulti } from "../../supabaseCalls/photoSupabaseCalls";
import "photoswipe/dist/photoswipe.css";
import Picture from "./picture";
import FlagIcon from "@mui/icons-material/Flag";
import CloseIcon from "@mui/icons-material/Close";
import { Gallery, Item } from "react-photoswipe-gallery";
import "./anchorPics.css";
import { animated } from "react-spring";

const AnchorPics = (props) => {
  const { animateAnchorModal } = props;
  const { siteModal, setSiteModal } = useContext(AnchorModalContext);
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { sliderVal } = useContext(SliderContext);
  const { animalVal } = useContext(AnimalContext);
  const { boundaries } = useContext(MapBoundsContext);
  const [monthVal, setMonthVal] = useState("");
  const [anchorPics, setAnchorPics] = useState([]);

  const { itterator, setItterator } = useContext(IterratorContext);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  const { movingBack, setMovingBack } = useContext(ReverseContext);

  const filterAnchorPhotos = async () => {
    
      let { minLat, maxLat, minLng, maxLng } = siteGPSBoundaries(
        selectedDiveSite.Latitude,
        selectedDiveSite.Longitude
      );

    try {
      const photos = await getPhotosforAnchor({
        animalVal,
        minLat: minLat,
        maxLat: maxLat,
        minLng: minLng,
        maxLng: maxLng,
      });
      if (photos) {
        setAnchorPics(photos);

        if (tutorialRunning && itterator === 11 && siteModal){
          if (photos.length === 0){
            setItterator(itterator + 1)
          } else {
            setItterator(itterator + 3)
          }
        } 

      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  useEffect(() => {
    switch (sliderVal) {
      case 1:
        setMonthVal("January");
        break;
      case 2:
        setMonthVal("February");
        break;
      case 3:
        setMonthVal("March");
        break;
      case 4:
        setMonthVal("April");
        break;
      case 5:
        setMonthVal("May");
        break;
      case 6:
        setMonthVal("June");
        break;
      case 7:
        setMonthVal("July");
        break;
      case 8:
        setMonthVal("August");
        break;
      case 9:
        setMonthVal("September");
        break;
      case 10:
        setMonthVal("October");
        break;
      case 11:
        setMonthVal("November");
        break;
      case 12:
        setMonthVal("December");
        break;
    }
  }, [sliderVal]);

  useEffect(() => {
    filterAnchorPhotos();
  }, []);


  useEffect(() => {
    filterAnchorPhotos();
  }, [siteModal]);


  useEffect(() => {
    filterAnchorPhotos();

  }, [selectedDiveSite]);


  const handleClose = async () => {

    if (tutorialRunning && itterator === 16){
      setItterator(itterator + 1)
    }
   setSiteModal(false)
   animateAnchorModal()
};
  
  return (
    <div className="masterDivA">
      <div className="fixerDiv">
      <div className="fixDiv">
      <div className="topDiv">
      <div className="flagContainer">
      <a
        className="atagDS"
        href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20Dive%20Site:%20"${selectedDiveSite.SiteName}"%20at%20Latitude:%20${selectedDiveSite.Latitude}%20Longitude:%20${selectedDiveSite.Longitude}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Dive%20site%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20dive%20site%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Dive%20site%20GPS%20coordinates%20are%20not%20correct%0D%0A%0D%0A(Please%20provide%20a%20correct%20latitude%20and%20longitude%20and%20we%20will%20update%20the%20record)`}
      >
        <FlagIcon sx={{ color: "red", height: 35, width: 35, marginTop: 0.4 }} />
      </a>
      </div>
      <h3 className="DiveSiteLabel">{selectedDiveSite.SiteName}</h3>
      <FormGroup>
            <Button
              variant="text"
              id="closeButton2"
              onClick={() => handleClose()}
              style={{ position: "absolute", right: 5, top: 0, backgroundColor: "transparent", border: "none"}}
            >
              <CloseIcon
                sx={{ color: "lightgrey", height: "36px", width: "36px" }}
              ></CloseIcon>
            </Button>
          </FormGroup>
      </div>
      </div>
      </div>
      <div className="picScollA">
        {anchorPics &&
          anchorPics.map((pic) => {
            return (
              <Picture key={pic.id} pic={pic}></Picture>
              
            );
          })}
        {anchorPics.length === 0 && (
          <div className="emptySite">
            No Sightings At This Site Yet!
          </div>
        )}
      </div>
      
    </div>
  );
};

export default AnchorPics;
