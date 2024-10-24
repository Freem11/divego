import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
  FontAwesome6,
  Fontisto,
} from "react-web-vector-icons";
import { InputBase } from "@mui/material";
import style from "./textInput.module.scss";

export default function PlainTextInput(props) {
  const {
    content,
    fontSz,
    isEditModeOn,
    setIsEditModeOn,
    isPartnerAccount,
    isMyShop,
    isNotVisitor,
    onChangeText,
    placeHolder,
  } = props;

  let checkPasser = false;
  // if (isPartnerAccount) {
  //   checkPasser = isPartnerAccount;
  // } else if (isMyShop) {
  //   checkPasser = isMyShop;
  // } else if (isNotVisitor) {
  //   checkPasser = isNotVisitor;
  // }

  return (
    <div className={style.inputContainerPlain}>
      <InputBase
        placeholder={placeHolder}
        value={content}
        onChange={onChangeText}
        style={{width: '100%'}}
      ></InputBase>
      {/* {!checkPasser ? (
        <FontAwesome6
        name="check"
        size={30}
        color="green"
        onPress={() => setIsEditModeOn(false)}
      />
      ) : ( */}
        {/* <FontAwesome6
        name="pencil"
        size={30}
        color="darkgrey"
        onCLick={() => setIsEditModeOn(true)}
      /> */}
       {/* )} */}
    </div>
  );
}
