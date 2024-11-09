import React from 'react';
import {
  FontAwesome6,
  Fontisto,
} from 'react-web-vector-icons';
import { InputBase } from '@mui/material';
import style from './textInput.module.scss';
import Icon from '../../icons/Icon';

export default function TextInputField(props) {
  const {
    dataType,
    icon,
    placeHolderText,
    secure,
    setSecureTextEntry,
    inputValue,
    onChangeText,
    handleClear,
    animal,
  } = props;

  return (
    <div className={style.inputContainer}>
      <Icon
        name={icon}
        fill="darkgrey"
        width="30"
        style={{ marginTop: 5 }}
      />

      <InputBase
        type={dataType}
        className={style.inputText}
        value={inputValue}
        placeholder={placeHolderText}
        onChange={onChangeText}
        // secureTextEntry={secure}
        // keyboardType={keyboardValue}
      >
      </InputBase>
      {placeHolderText === 'Password'
        ? (
            secure
              ? (
                  <FontAwesome6
                    name="eye-slash"
                    size={30}
                    color="darkgrey"
                    onClick={() => setSecureTextEntry(false)}
                  />
                )
              : (
                  <FontAwesome6
                    name="eye"
                    size={30}
                    color="darkgrey"
                    onClick={() => setSecureTextEntry(true)}
                  />
                )
          )
        : null}
      {(placeHolderText === 'Sea Life Encountered'
        || placeHolderText === 'Search by Dive Site name or Location')
        && inputValue.length > 1
        ? (
            <Icon
              name="highlight-off"
              fill="darkgrey"
              width="30"
              onClick={() => handleClear()}
            />
          )
        : (
            <div style={{ width: '30px', height: '30px' }}></div>
          )}

      {placeHolderText === 'Blow some bubbles'
        ? (
            <Fontisto
              name="snorkel"
              size={30}
              color="darkgrey"
              onClick={() => handleClear()}
            />
          )
        : (
            <div style={{ width: '30px', height: '30px' }}></div>
          )}
    </div>
  );
}
