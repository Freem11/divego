import { useState, useContext } from "react";
import { AnimalContext } from "./contexts/animalContext";
import { useEffect } from "react";
import { photos } from "./data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAnimalNames } from "../supabaseCalls/photoSupabaseCalls";
// import { getAnimalNames } from "../axiosCalls/photoAxiosCalls";
import { AnimalRevealContext } from "./contexts/animalRevealContext";

export default function AnimalSearcher() {
  const { setShowAnimalSearch } = useContext(AnimalRevealContext);
  const { setAnimalVal } = useContext(AnimalContext);
  const [list, setList] = useState([]);

  useEffect(async() => {
    let animalArray = []
    let animalNames = await getAnimalNames();  
    animalNames.forEach((animal) => {
        if (!animalArray.includes(animal.label)){
          animalArray.push(animal.label)
        }
    })

    setList(animalArray);
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list}
      onChange={(event, value) => {
        if (!value) {
          setAnimalVal("All");
          setShowAnimalSearch(!setShowAnimalSearch);
        } else {
          setAnimalVal(value);
          setShowAnimalSearch(!setShowAnimalSearch);
        }
      }}
      sx={{
        "&.Mui-selected": { opacity: "80%" },
        "&.Mui-selected:hover": { opacity: "80%" },
        "&:hover": { opacity: "80%" },
        width: 222,
        height: 40,
        backgroundColor: "white",
        opacity: "70%",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Species"
          variant="standard"
          sx={{ paddingLeft: "0px" }}
        />
      )}
    ></Autocomplete>
  );
}
