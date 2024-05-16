import React, { useContext, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { JumpContext } from "../contexts/jumpContext";
import { GeoCoderContext } from "../contexts/geoCoderContext";
import { CoordsContext } from "../contexts/mapCoordsContext";
import { MapSearchModalContext } from "../contexts/mapSearchModalContext";

const PlacesAutoComplete = (props) => {
  const { setMapSearchYCoord, mapSearchYCoord } = props;
  const { jump, setJump } = useContext(JumpContext);
  const { setShowGeoCoder } = useContext(GeoCoderContext);
  const { setMapCoords } = useContext(CoordsContext);
  const { mapSearchModal, setMapSearchModal } = useContext(
    MapSearchModalContext
  );

  const {
    ready,
    init,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ inOnMount: false });


  useEffect(() => {
    if (mapSearchModal) {
      init();
    }
  }, [mapSearchModal]);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });

    const { lat, lng } = await getLatLng(results[0]);
    setMapCoords([lat, lng]);
    setValue("");
    setJump(!jump);
    setMapSearchYCoord(0);
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="  Search Places..."
        style={{
          marginTop: "5px",
          marginLeft: "2px",
          width: "18vw",
          height: "3.5vh",
          borderRadius: "10px",
          fontSize: "1.5vw",
          zIndex: 209,
        }}
      />
      <div
        className="popover"
        style={{
          marginTop: "2vh",
          marginLeft: "-1.5vw",
          height: "auto",
          // zIndex: "100",
          position: "absolute",
        }}
      >
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <li
              style={{
                display: "flex",
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
              key={place_id}
              value={description}
              className="popopt"
              onClick={() => handleSelect(description)}
            >
              <div
                style={{
                  color: "black",
                  fontSize: "1vw",
                  fontFamily: "Itim, cursive",
                  fontWeight: "normal",
                }}
              >
                {description}
              </div>
            </li>
          ))}
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
