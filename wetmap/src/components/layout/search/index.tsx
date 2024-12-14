import React, { useContext } from 'react';
import { DynamicSelectOptionsMainSearch } from './DynamicSelectOptionsMainSearch';
import DynamicSelect from '../../reusables/dynamicSelect';
import { DropdownItemProps } from '../../reusables/select/components/dropdownItem';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import getPlaceLocation from '../../../helpers/googleMapGeocoder';
import { SelectedDiveSiteContext } from '../../contexts/selectedDiveSiteContext';
import { getDiveSitesByIDs } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import style from './style.module.scss';
import MainSearchDropdownItem from './components/mainSearchDropdownItem';

export default function MainSearch() {
  const { setMapCoords } = useContext(CoordsContext);
  const { setSelectedDiveSite } = useContext(SelectedDiveSiteContext);


  const handleSelect = async (event) => {
    let coordinates: number[] = [];

    const data = event?.target?.value?.data;

    if (data?.type === 'diveSite') {
      const diveSites = await getDiveSitesByIDs(JSON.stringify([data.id]));
      diveSites?.some((diveSite) => {
        coordinates = [diveSite.lat, diveSite.lng];
        setSelectedDiveSite(diveSite);
        return true;
      });
    }

    if (data?.type === 'place') {
      const response = await getPlaceLocation({ placeId: data.id });
      response?.results?.some((result) => {
        coordinates = [result.geometry.location.lat(), result.geometry.location.lng()];
        return true;
      });
    }

    if (coordinates.length > 0) {
      setMapCoords(coordinates);
    }
  };

  return (
    <div className={style.mainSearch}>
      <DynamicSelect
        labelInValue={true}
        getMoreOptions={DynamicSelectOptionsMainSearch.getMoreOptions}
        onChange={handleSelect}
        dropdownItemComponent={(props: DropdownItemProps) => {
          return <MainSearchDropdownItem {...props} />;
        }}
      />
    </div>
  );
}
