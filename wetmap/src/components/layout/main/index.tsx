import React from 'react';
import LayoutMainView from './view';
import { DynamicSelectMainSearch } from '../../../entities/DynamicSelectMainSearch';

export default function LayoutMain() {
  return (
    <LayoutMainView
      getMoreSearchItems={DynamicSelectMainSearch.getMoreOptions}
    />
  );
}
