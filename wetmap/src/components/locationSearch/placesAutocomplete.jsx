import React, { useContext, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import { JumpContext } from "../contexts/jumpContext";
import { GeoCoderContext } from "../contexts/geoCoderContext";
import { CoordsContext } from "../contexts/mapCoordsContext";

const PlacesAutoComplete = (props) => {
  const { setMapSearchYCoord, mapSearchYCoord } = props;
  const { jump, setJump } = useContext(JumpContext);
  const { setShowGeoCoder } = useContext(GeoCoderContext);
  const { setMapCoords } = useContext(CoordsContext);

  const {
    ready,
    init,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ inOnMount: false });

  useEffect(() => {
    if (mapSearchYCoord !== 0) {
      init();
    }
  }, [mapSearchYCoord]);

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
          marginTop: "0vh",
          marginLeft: "-1.5vw",
          height: "auto",
          zIndex: "100",
          position: "absolute",
        }}
      >
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <li
              style={{
                display: "flex",
                height: "2.5vh",
                width: "20vw",
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
