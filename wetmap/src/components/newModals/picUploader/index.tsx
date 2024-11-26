import React from 'react';
import PicUploaderView from './view';
import { DynamicSelectOptionsAnimals } from '../../../entities/DynamicSelectOptionsAnimals';


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
