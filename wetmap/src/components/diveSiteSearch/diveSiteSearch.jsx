import { useState, useContext } from "react";
import { useEffect } from "react";
import AutoSuggest from "../autoSuggest/autoSuggest";
import { getSiteNamesThatFit, getSingleDiveSiteByNameAndRegion} from "../../supabaseCalls/diveSiteSupabaseCalls";
import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { MapBoundsContext } from "../contexts/mapBoundariesContext";
import { Iterrator2Context } from "../contexts/iterrator2Context";
import { TutorialContext } from "../contexts/tutorialContext";
import { JumpContext } from "../contexts/jumpContext";

export default function DiveSiteAutoComplete(props) {
  const { setSiteSearchModalYCoord } = props;
  const { jump, setJump } = useContext(JumpContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext
  );
  const { boundaries } = useContext(MapBoundsContext);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { tutorialRunning } = useContext(TutorialContext);

  let diveSiteNames;

  const handleDiveSiteList = async () => {
    let diveSiteArray = [];

    if (boundaries && boundaries.length > 0) {

      diveSiteNames = null;
      diveSiteArray = [];

      diveSiteNames = await getSiteNamesThatFit(searchText);
    }

    if (diveSiteNames) {
      diveSiteNames.forEach((diveSite) => {
        let fullDSName;
          if (diveSite.region) {
            fullDSName = `${diveSite.name} ~ ${diveSite.region}`;
          } else {
            fullDSName = diveSite.name;
          }
          diveSiteArray.push(fullDSName);
      });
    }

    setList(diveSiteArray);
  };

  useEffect(() => {
    handleDiveSiteList();
  }, []);

  useEffect(() => {
    handleDiveSiteList();
  }, [boundaries, searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelect = async (value) => {
    setSearchText(value);
    if (value !== null) {
      let nameOnly = value.split(" ~ ");
      let diveSiteSet = await getSingleDiveSiteByNameAndRegion({ name: nameOnly[0], region: nameOnly[1] });
  
      if (diveSiteSet) {
    
        setSelectedDiveSite({
          SiteName: diveSiteSet[0].name,
          Latitude: diveSiteSet[0].lat,
          Longitude: diveSiteSet[0].lng,
        });

        if (tutorialRunning) {
          if (itterator2 === 5) {
            setItterator2(itterator2 + 1);
          }
        }
      }
      setSiteSearchModalYCoord(0);
      setJump(!jump);
      setSearchText("");
    }
  };

  return (
    <div className='column col-8'>
      <AutoSuggest
        placeholder={"Search Dive Sites..."}
        value={searchText}
        list={list}
        clear={() => setSearchText("")}
        handleChange={handleChange}
        handleSelect={handleSelect}
        style={{
          height: "3vh",
          marginLeft: "1vw",
          marginBottom: "1vw",
          fontSize: "2vw",
          fontFamily: "Itim, cursive",
        }}
        style1={{
          marginTop: "0vh",
          marginLeft: "-1.5vw",
        }}
        style2={{
          display: "flex",
          height: "2.5vh",
          width: "20vw",
          paddingTop: "0.5vh",
          paddingBottom: "0.5vh",
          paddingLeft: "1vw",
          paddingRight: "1vw",
          listStyle: "none",
          backgroundColor: "white",
          marginBottom: "0.1vh",
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        style3={{
          color: "black",
          fontSize: "1vw",
          fontFamily: "Itim, cursive",
          fontWeight: "normal",
        }}
      />
    </div>
  );
}
