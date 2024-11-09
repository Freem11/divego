import React from 'react';
import screenData from '../newModals/screenData.json';
// import style from './style.module.scss';
import TextInputField from '../newModals/textInput';
import ListItemView from '../searchToolListItem/view';

import config from '../../icons/_config.json';

type IconName = keyof typeof config;

type SearchOption = {
  id:     number
  title:  string
  source: IconName
};

type SearchViewProps = {
  handleClear:    () => void
  handleChange:   (text: string) => void
  handleSelect:   (text: string) => void
  inputText:      string
  options:        SearchOption[]
  setSearchValue: React.SetStateAction<string>
};

export default function SearchView(props: SearchViewProps) {
  return (
    <div className="mt-6 mr-4 pr-4 full-height" style={{ overflow: 'scroll' }}>
      <TextInputField
        dataType="text"
        icon="navigation-variant-outline"
        inputValue={props.inputText}
        placeHolderText={screenData.SearchPage.placeholder}
        onChangeText={(e: any) => props.handleChange(e.target.value)}
        handleClear={props.handleClear}
        secure={false}
      />
      {props.options.length >  0 && props.options.map((option) => {
        return (
          <ListItemView
            key={option.id}
            value={option.title}
            icontype={option.source}
            setSearchValue={props.setSearchValue}
            handleSelect={props.handleSelect}
          />
        );
      })}


    </div>
  );
}
