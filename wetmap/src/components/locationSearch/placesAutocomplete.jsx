import React, { useContext } from "react";
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
  const { setMapSearchYCoord } = props;
  const { jump, setJump } = useContext(JumpContext);
  const { setShowGeoCoder } = useContext(GeoCoderContext);
  const { setMapCoords } = useContext(CoordsContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

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
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
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
          zIndex: 209
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
