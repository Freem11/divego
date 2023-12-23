import React, { useState, useContext, useEffect } from "react";
import { getAnimalNamesThatFit } from "../../supabaseCalls/photoSupabaseCalls";
import InputBase from "@mui/material/InputBase";
import AutoSuggestListItem from "./animalSuggestListItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./autoSuggest.css";
import { Iterrator3Context } from "../contexts/iterrator3Context";
import { TutorialContext } from "../contexts/tutorialContext";

let waiter;

export default function AnimalAutoSuggest(props) {
  const { setPin, pin, setList, list, clearAnimal } = props;
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
  
  useEffect(() => {
    clearTimeout(waiter);

    if (tutorialRunning) {
      if (itterator3 === 14) {
        waiter = setTimeout(() => {
          setItterator3(itterator3 + 1);
        }, 2000);
      }
    }
  }, [pin.Animal]);

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
            height: "20px",
            color: "#F0EEEB",
            width: "260px",
            marginLeft: "10px",
            // paddingRight: "10px",
            paddingLeft: "0px",
            marginTop: "10px",
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
          marginTop: "30px",
          marginLeft: "50px",
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
