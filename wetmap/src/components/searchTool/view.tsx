import React from 'react';
import screenData from '../newModals/screenData.json';
// import style from './style.module.scss';
import TextInput from '../reusables/textInput';
import Icon from '../../icons/Icon';

type SearchViewProps = {
  handleClear:  () => void
  handleChange: (text: string) => void
  inputText:    string
  options:      []
};

export default function SearchView(props: SearchViewProps) {
  return (
    <div className="mt-6 ml-4 mr-4 full-height">
      <TextInput
        iconLeft={<Icon name="navigation-variant-outline" />}
        placeholder={screenData.SearchPage.placeholder}
      />
    </div>
  );
}
