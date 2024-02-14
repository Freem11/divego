import React, { useContext, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
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
  } = usePlacesAutocomplete({inOnMount : false});

  useEffect(() => {
    if(mapSearchYCoord !== 0){
      init()
    }
  }, [mapSearchYCoord])

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
    <Combobox onSelect={handleSelect} style={{zIndex:210}}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // disabled={!ready}
        placeholder="  Search Places..."
        style={{
          marginTop: "5px",
          marginLeft: "2px",
          // opacity: 0.7,
          width: "18vw",
          height: "3.5vh",
          borderRadius: "10px",
          fontSize: "1.5vw",
          zIndex: 220
        }}
      />
      <ComboboxPopover className="popover">
        <ComboboxList className="poplist">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="popopt"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutoComplete;
