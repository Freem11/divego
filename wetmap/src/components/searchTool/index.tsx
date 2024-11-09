import React, { useState, useContext, useEffect } from 'react';
import SearchView from './view';
import { getSingleDiveSiteByNameAndRegion, getSiteNamesThatFit } from '../../supabaseCalls/diveSiteSupabaseCalls';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { ModalContext } from '../contexts/modalContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { addIconType, addIndexNumber } from '../../helpers/optionHelpers';

const GoogleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function SearchTool() {
  const { boundaries } = useContext(MapBoundsContext);
  const { modalShow }        = useContext(ModalContext);
  const { setSelectedDiveSite } = useContext(SelectedDiveSiteContext);

  const [textSource, setTextSource] = useState(false);
  const [list, setList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isClearOn, setIsClearOn] = useState(false);

  const getPlaces = async (text: string) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GoogleMapsApiKey}`,
      );
      const placeInfo = await res.json();
      if (placeInfo) {
        return placeInfo.predictions;
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // interface DiveSiteData {
  //   UserID:               string
  //   created_at:           string
  //   diveSiteBio:          string | null
  //   diveSiteProfilePhoto: string | null
  //   id:                   number
  //   lat:                  number
  //   lng:                  number
  //   name:                 string
  //   region:               string | null
  //   userName:             string
  // }

  interface PlacesData {
    description:           string
    matched_substrings:    []
    place_id:              string
    reference:             string
    structured_formatting: {
      main_text:                    string
      main_text_matched_substrings: []
      secondary_text:               string
    }
    terms: []
    types: []
  }

  const handleDataList = async (value: string) => {
    const diveSiteArray: string[] = [];
    const placesArray: string[] = [];

    // let placesData: PlacesData[] | undefined = undefined;
    let diveSiteData: { [x: string]: any }[] | undefined = undefined;

    if (boundaries.length > 0) {
      diveSiteData = await getSiteNamesThatFit(value);
    } else {
      diveSiteData = undefined;
    }

    // placesData = await getPlaces(value);

    // if (placesData) {
    //   placesData.forEach((place) => {
    //     placesArray.push(place.description);
    //   });
    // }

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
      ...addIconType(placesArray, 'compass'),
      ...addIconType(diveSiteArray, 'anchor'),
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
    setTextSource(false);
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

      if (diveSiteSet) {
        setSelectedDiveSite({
          SiteName:  diveSiteSet[0].name,
          Latitude:  diveSiteSet[0].lat,
          Longitude: diveSiteSet[0].lng,
        });
      }
      // if (props.onSelect && typeof props.onSelect === 'function') {
      //   props.onSelect();
      // }
      // setJump(!jump);
      setSearchValue('');
    }
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
}
