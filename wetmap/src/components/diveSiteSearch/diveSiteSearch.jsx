import { useState, useContext } from "react";
import { AnimalContext } from "../contexts/animalContext";
import { useEffect } from "react";
import { photos } from "../data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import AutoSuggest from "../autoSuggest/autoSuggest";
import TextField from "@mui/material/TextField";
import { diveSites } from "../../supabaseCalls/diveSiteSupabaseCalls";
// import { getAnimalNames } from "../supabaseCalls/photoSupabaseCalls";
// import { getAnimalNames } from "../axiosCalls/photoAxiosCalls";
import { AnimalRevealContext } from "../contexts/animalRevealContext";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { MapBoundsContext } from "../contexts/mapBoundariesContext";
import { Iterrator2Context } from "../contexts/iterrator2Context";
import { TutorialContext } from "../contexts/tutorialContext";

export default function DiveSiteAutoComplete(props) {
  const { setSiteSearchModalYCoord } = props;

  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext
  );
  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { setShowAnimalSearch } = useContext(AnimalRevealContext);
  const { setAnimalVal } = useContext(AnimalContext);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);

  let diveSiteNames;

  const handleDiveSiteList = async () => {
    let diveSiteArray = [];

    if (boundaries && boundaries.length > 0) {
      let minLat = boundaries[1];
      let maxLat = boundaries[3];

      let minLng = boundaries[0];
      let maxLng = boundaries[2];

      diveSiteNames = null;
      diveSiteArray = [];

      diveSiteNames = await diveSites({ minLat, maxLat, minLng, maxLng });
    }

    if (diveSiteNames) {
      diveSiteNames.forEach((site) => {
        if (!diveSiteArray.includes(site.name)) {
          diveSiteArray.push(site.name);
        }
      });
    }

    setList(diveSiteArray);
  };

  useEffect(async () => {
    handleDiveSiteList();
  }, []);

  useEffect(async () => {
    handleDiveSiteList();
  }, [boundaries]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSelect = (value) => {
    setSearchText(value);
    if (value !== null) {
      let minLat2 = boundaries[1];
      let maxLat2 = boundaries[3];

      let minLng2 = boundaries[0];
      let maxLng2 = boundaries[2];

      let diveSiteSet = diveSites({
        minLat: minLat2,
        maxLat: maxLat2,
        minLng: minLng2,
        maxLng: maxLng2,
      });

      Promise.all([diveSiteSet])
        .then((response) => {
          response[0].forEach((site) => {
            if (site.name === value) {
              setSelectedDiveSite({
                ...selectedDiveSite,
                SiteName: site.name,
                Latitude: site.lat,
                Longitude: site.lng,
              });
              if (tutorialRunning) {
                if (itterator2 === 5) {
                  setItterator2(itterator2 + 1);
                }
              }
              setSiteSearchModalYCoord(0);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className={"autosuggestbox"}>
      <AutoSuggest
        placeholder={"Dive Site"}
        value={searchText}
        list={list}
        clear={() => setSearchText("")}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
    </div>
  );
}
