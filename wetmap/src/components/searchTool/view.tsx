import React from 'react';
import screenData from '../newModals/screenData.json';
// import style from './style.module.scss';
import TextInputField from '../newModals/textInput';
import Icon from '../../icons/Icon';

type SearchViewProps = {
  handleClear:  () => void
  handleChange: (text: string) => void
  inputText:    string
  options:      []
};

export default function SearchView(props: SearchViewProps) {
  return (
    <div className="mt-6 mr-4 pr-4 full-height">
      <TextInputField
        dataType="text"
        icon="navigation-variant-outline"
        inputValue={props.inputText}
        placeHolderText={screenData.SearchPage.placeholder}
        onChangeText={props.handleChange}
        handleClear={props.handleClear}
        secure={false}
      />

    </div>
  );
}
