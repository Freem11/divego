import { useState, useContext } from "react";
import { AnimalContext } from "../contexts/animalContext";
import { useEffect } from "react";
import { photos } from "../data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import AutoSuggest from "../autoSuggest/autoSuggest";
import TextField from "@mui/material/TextField";
import { diveSites, getSiteNamesThatFit } from "../../supabaseCalls/diveSiteSupabaseCalls";
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

      diveSiteNames = await getSiteNamesThatFit({ minLat, maxLat, minLng, maxLng },searchText);
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
  }, [boundaries, searchText]);

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

      let diveSiteSet = getSiteNamesThatFit({
        minLat: minLat2,
        maxLat: maxLat2,
        minLng: minLng2,
        maxLng: maxLng2,
      },
      searchText
      );

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
              setSearchText("")
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className={"autosuggestboxWhite"}>
      <AutoSuggest
        placeholder={"Search Dive Sites..."}
        value={searchText}
        list={list}
        clear={() => setSearchText("")}
        handleChange={handleChange}
        handleSelect={handleSelect}
        style={{
          height: "3vh",
          marginLeft: "2vw",
          marginBottom: "1vw",
          fontSize: "2vw",
          fontFamily: "Itim, cursive",
        }}
        style1={{
          marginTop: "0vh",
          marginLeft: "1vw"
        }}
        style2={{
          display: "flex",
          height: "2.5vh",
          width: "15vw",
          paddingLeft: "1vw",
          paddingRight: "1vw",
          listStyle: "none",
          backgroundColor: "white",
          marginBottom: "0.1vh",
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "center"
        }}
        style3={{
          color: "black",
          fontSize: "1vw",
          fontFamily: "Itim, cursive",
          fontWeight: "normal"
        }}
      />
    </div>
  );
}
