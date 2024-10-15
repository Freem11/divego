import React, {useState} from "react";
import AutoSuggestListItem from "./autoSuggestListItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import "./autoSuggest.css";
import InputField from "../reusables/inputField";
import TextInputField from '../newModals/textInput';
import { getAnimalNamesThatFit } from "../../supabaseCalls/photoSupabaseCalls";

export default function AutoSuggest(props) {
  const {
    pin,
    setPin,
    placeHolderText,
    inputValue,
    icon,
    vectorIcon,
  } = props;

  const [list, setList] = useState([]);
  const [textSource, setTextSource] = useState(false);

  const handleList = async (values) => {
    if (values.value === 1) {
      setPin({ ...pin, Animal: values.animal });

      if (values.animal.length > 0) {
        let newfilteredList = await getAnimalNamesThatFit(values.animal);
        let animalArray = [];
        newfilteredList.forEach((animal) => {
          if (!animalArray.includes(animal.label)) {
            animalArray.push(animal.label);
          }
        });
        setList(animalArray);
      } else {
        setList([]);
      }
    } else {
      setPin({ ...pin, Animal: values.animal });
      setList([]);
    }
  };

  const handleClear = () => {
    setTextSource(false);
    setPin({ ...pin, Animal: "" });
    setList([]);
  };

  const handleChange = async (e) => {
    if (!textSource) {
      handleList({ animal: e.target.value, value: 1 });
    }
  };

  return (
    <div className="column col-11">
      <TextInputField
        icon={icon}
        inputValue={inputValue}
        placeHolderText={placeHolderText}
        secure={false}
        vectorIcon={"MaterialCommunityIcons"}
        onChangeText={handleChange}
        handleClear={handleClear}
        animal={pin.Animal}
      />
      <div
        // style={{
        //   ...style1,
        //   height: "auto",
        //   zIndex: "100",
        //   position: "absolute",
        // }}
      >
        {list.length > 0 &&
          list.map((element) => {
            return (
              <AutoSuggestListItem
                key={element}
                value={element}
                handleSelect={handleList}
                // style={style2}
                // style3={style3}
              />
            );
          })}
      </div>
    </div>
  );
}
