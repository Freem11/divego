import React from 'react';
import PicUploaderView from './view';
import { DynamicSelectOptionsAnimals } from '../../reusables/dynamicSelect/DynamicSelectOptionsAnimals';


export default function PicUploader(props) {
  return (
    <PicUploaderView
      getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
      onSubmit={(data) => {
        console.log({ data });
      }}
    />
  );
}
