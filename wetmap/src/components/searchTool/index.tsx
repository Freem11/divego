import React, { useState, useContext, useEffect } from 'react';
import SearchView from './view';
import { getSingleDiveSiteByNameAndRegion, getSiteNamesThatFit } from '../../supabaseCalls/diveSiteSupabaseCalls';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { addIconTypeDiveSite, addIconTypePlaces, addIndexNumber } from '../../helpers/optionHelpers';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export default function SearchTool(props) {
  const { onModalCancel } = props;
  const { boundaries } = useContext(MapBoundsContext);
  const { setSelectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { setMapCoords } = useContext(CoordsContext);

  const [list, setList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isClearOn, setIsClearOn] = useState(false);

  const {
    init,
    setValue,
    suggestions: { data },
  } = usePlacesAutocomplete({ initOnMount: false });

  useEffect(() => {
    init();
  }, []);

  const handleDataList = async (value: string) => {
    setValue(value);
    const diveSiteArray: string[] = [];
    let diveSiteData: { [x: string]: any }[] | undefined = undefined;

    if (boundaries.length > 0) {
      diveSiteData = await getSiteNamesThatFit(value);
    } else {
      diveSiteData = undefined;
    }

    if (diveSiteData) {
      diveSiteData.forEach((diveSite) => {
        if (!diveSiteArray.includes(diveSite.name)) {
          let fullDSName;
          if (diveSite.region) {
            fullDSName = `${diveSite.name} ~ ${diveSite.region}`;
          } else {
            fullDSName = diveSite.name;
          }
          diveSiteArray.push(fullDSName);
        }
      });
    }

    const megaArray = [
      ...addIconTypePlaces(data, 'compass-outline'),
      ...addIconTypeDiveSite(diveSiteArray, 'anchor'),
    ];
    setList(addIndexNumber(megaArray));
  };

  const handleChange = (text: string) => {
    if (isClearOn) {
      setIsClearOn(false);
      return;
    }
    setSearchValue(text);
    handleDataList(text);
  };

  const handleClear = () => {
    setIsClearOn(true);
    setList([]);
    setSearchValue('');
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setList([]);
    }
  }, [searchValue]);

  const handleSelect = async (value: string) => {
    setSearchValue(value);
    if (value !== null) {
      const nameOnly = value.split(' ~ ');
      const diveSiteSet = await getSingleDiveSiteByNameAndRegion({ name: nameOnly[0], region: nameOnly[1] });

      if (diveSiteSet && diveSiteSet?.length > 0) {
        setSelectedDiveSite({
          SiteName:  diveSiteSet[0].name,
          Latitude:  diveSiteSet[0].lat,
          Longitude: diveSiteSet[0].lng,
        });
      } else {
        const address = value;
        const results = await getGeocode({ address });

        const { lat, lng } = await getLatLng(results[0]);
        setMapCoords([lat, lng]);
        setValue('');
      };
    }
    setSearchValue('');
    onModalCancel();
  };

  return (
    <SearchView
      handleClear={handleClear}
      handleChange={handleChange}
      handleSelect={handleSelect}
      inputText={searchValue}
      options={list}
      setSearchValue={searchValue}
    />
  );
};
