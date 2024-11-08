import React, { useState, useContext, useEffect } from 'react';
import DiveSiteView from './view';
import { getSiteNamesThatFit } from "../../supabaseCalls/diveSiteSupabaseCalls";
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { ModalContext } from '../../contexts/modalContext';
import { addIconType, addIndexNumber } from '../../helpers/optionHelpers';

let GoogleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export default function SearchTool(props) {
  const { boundaries } = useContext(MapBoundsContext);
  const { profile }          = useContext(UserProfileContext);
  const { modalShow }        = useContext(ModalContext);

  const [diveSite, setDiveSite] = useState<DiveSiteWithUserName | null>(null);
  const [diveSitePics, setDiveSitePics] = useState<PhotosGroupedByDate[] | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);

  const [textSource, setTextSource] = useState(false);
  const [list, setList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isClearOn, setIsClearOn] = useState(false);

  const getPlaces = async (text: string) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GoogleMapsApiKey}`
      );
      const placeInfo = await res.json();
      if (placeInfo) {
        return placeInfo.predictions;
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  interface DiveSiteData {
    UserID: string,
    created_at: string,
    diveSiteBio: string | null,
    diveSiteProfilePhoto: string | null,
    id: number,
    lat: number,
    lng: number,
    name: string,
    region: string | null,
    userName: string
  }

  interface PlacesData {
    description: string,
    matched_substrings: [],
    place_id: string,
    reference: string,
    structured_formatting: {
      main_text: string,
      main_text_matched_substrings: [],
      secondary_text: string,
    },
    terms: [],
    types: []
  }

  const handleDataList = async (value: string) => {
    let diveSiteArray: string[] = []
    let placesArray: string[] = [];

    let placesData: PlacesData[] | undefined = undefined;
    let diveSiteData: DiveSiteData[] | undefined = undefined;

    if (boundaries.length > 0) {
      diveSiteData = await getSiteNamesThatFit(value);
    } else {
      diveSiteData = undefined;
    }

    placesData = await getPlaces(value);

    if (placesData) {
      placesData.forEach((place) => {
        placesArray.push(place.description);
      });
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
    let megaArray = [
      ...addIconType(placesArray, "compass"),
      ...addIconType(diveSiteArray, "anchor"),
    ];
    setList(addIndexNumber(megaArray));
  };

  const handleChange = (text: string) => {
    if (isClearOn){
      setIsClearOn(false)
      return
    }
    setSearchValue(text);
    handleDataList(text);
    
  };

  const handleClear = () => {
    setIsClearOn(true)
    setList([]);
    setTextSource(false);
    setSearchValue("");
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setList([]);
    }
  }, [searchValue]);


  return (
    <SearchView
      onClose={props.onModalCancel}
      openPicUploader={openPicUploader}
      handleImageSelection={handleImageSelection}
      diveSite={diveSite}
      diveSitePics={diveSitePics}
      isPartnerAccount={isPartnerAccount}
      headerPictureUrl={headerPictureUrl}
      onDiveSiteBioChange={async (newValue) => {
        if (diveSite) {
          setDiveSite({ ...diveSite, divesitebio: newValue });
          try {
            await updateDiveSite({
              id:    diveSite.id,
              bio:   newValue,
              photo: diveSite.divesiteprofilephoto,
            });
          } catch (e) {
            console.log({ title: 'Error19', message: e.message });
          }
        }
      }}
    />
  );
}
