import React from "react";
import { FontAwesome6 } from "react-web-vector-icons";
import { InputBase } from "@mui/material";

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
  if (isPartnerAccount) {
    checkPasser = isPartnerAccount;
  } else if (isMyShop) {
    checkPasser = isMyShop;
  } else if (isNotVisitor) {
    checkPasser = isNotVisitor;
  }

  return (
    <div style={styles.container}>
      <InputBase
        placeholder={placeHolder}
        value={content}
        contentEditable={isEditModeOn ? true : false}
        onChange={onChangeText}
      />
      {(placeHolder && placeHolder.length > 100) ||
      !checkPasser ? null : isEditModeOn ? (
        <FontAwesome6
        name="check"
        size={30}
        color="green"
        onPress={() => setIsEditModeOn(false)}
      />
      ) : (
        <FontAwesome6
        name="pencil"
        size={30}
        color="darkgrey"
        onPress={() => setIsEditModeOn(true)}
      />
      )}
    </div>
  );
}
