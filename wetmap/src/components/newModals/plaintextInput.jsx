import React from 'react';
import { InputBase } from '@mui/material';
import style from './textInput.module.scss';
import Icon from '../../icons/Icon';

export default function PlainTextInput(props) {
  const {
    content,
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
    <div className={style.inputContainerPlain}>
      <InputBase
        placeholder={placeHolder}
        value={content}
        onChange={onChangeText}
        style={{ width: '100%' }}
      >
      </InputBase>
      {(placeHolder && (placeHolder.length > 100))  || !checkPasser
        ? null
        : isEditModeOn
          ? (
              <Icon
                name="check-bold"
                fill="green"
                width="30px"
                onClick={() => setIsEditModeOn(false)}
              />

            )
          : (
              <Icon
                name="pencil"
                fill="darkgrey"
                width="30px"
                onClick={() => setIsEditModeOn(true)}
              />
            )}
    </div>
  );
}
