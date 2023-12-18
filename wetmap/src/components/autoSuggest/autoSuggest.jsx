import React from "react";
import { getAnimalNamesThatFit } from "../../supabaseCalls/photoSupabaseCalls";
import InputBase from "@mui/material/InputBase";
import AutoSuggestListItem from "./animalSuggestListItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./autoSuggest.css";

export default function AnimalAutoSuggest(props) {
  const { setPin, pin, setList, list, clearAnimal } = props;

  const handleChange = async (e) => {
    setPin({ ...pin, Animal: e.target.value });

    if (e.target.value.length > 0) {
      let fitleredListOfAnimals = await getAnimalNamesThatFit(e.target.value);
      let animalArray = [];
      fitleredListOfAnimals.forEach((animal) => {
        if (!animalArray.includes(animal.label)) {
          animalArray.push(animal.label);
        }
      });
      setList(animalArray);
    } else {
      setList([]);
    }
  };

  return (
    <div>
      <InputBase
        className="suggestInput"
        placeholder="Animal"
        name="Animal"
        value={pin.Animal}
        onChange={handleChange}
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "Itim",
            fontSize: 16,
            textOverflow: "ellipsis",
            backgroundColor: "transparent",
            height: "10px",
            color: "#F0EEEB",
            width: "130px",
            marginLeft: "0px",
            // paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "7px",
          },
        }}
      ></InputBase>

      {pin.Animal.length > 1 && (
        <div variant="text" id="XButton" onClick={clearAnimal}>
          <HighlightOffIcon
            sx={{
              color: "white",
              height: "10px",
              width: "10px",
              position: "absolute",
            }}
          ></HighlightOffIcon>
        </div>
      )}

      <div
        style={{
          height: "auto",
          zIndex: "100",
          position: "absolute",
          marginTop: "5px",
          marginLeft: "-10px",
        }}
      >
        {list.length > 0 &&
          list.map((animal) => {
            return (
              <AutoSuggestListItem
                key={animal}
                name={animal}
                pin={pin}
                setPin={setPin}
                setList={setList}
                clearAnimal={clearAnimal}
              />
            );
          })}
      </div>
    </div>
  );
}
