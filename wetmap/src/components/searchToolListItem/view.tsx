import React from 'react';
// import style from './style.module.scss';
import Icon from '../../icons/Icon';
import config from '../../icons/_config.json';

type IconName = keyof typeof config;

type ListItemProps = {
  key:            number
  value:          string
  icontype:       IconName
  setSearchValue: React.SetStateAction<string>
  handleSelect:   (text: string) => void
};

export default function ListItemView(props: ListItemProps) {
  return (
    <div onClick={() => props.handleSelect(props.value)} style={{ cursor: 'pointer', paddingLeft: 5,  height: 50,  display: 'flex', alignItems: 'center', flexDirection: 'row', width: '80%', marginLeft: '10%', marginTop: 5, border: ' 1px solid lightgray', borderRadius: 8 }}>
      <Icon
        name={props.icontype}
        fill="lightblue"
        width="25"
      />
      <div style={{ marginLeft: 5 }}>{props.value}</div>
    </div>
  );
}
