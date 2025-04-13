import React, { useState, useContext, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { ModalContext } from '../reusables/modal/context';
import { getDiveSitesByIDs } from '../../supabaseCalls/diveSiteSupabaseCalls';
import style from './style.module.scss';
import ButtonIcon from '../reusables/buttonIcon';
import Icon from '../../icons/Icon';
import { MapContext } from '../googleMap/mapContext';
import { useTranslation } from 'react-i18next';

export default function Itinerary(props) {
  const { itinerary, selectedID, setSelectedID } = props;
  const { setSitesArray } = useContext(SitesArrayContext);
  const { mapRef, setMapConfig } = useContext(MapContext);
  const { modalPause } = useContext(ModalContext);
  const { t } = useTranslation();

  const [hiddenHeigth, setHiddenHeigth] = useState(0);

  const heightChange = useSpring({
    from: { height: 0 },
    to:   { height: hiddenHeigth },
  });

  const startMoreInfoAnimation = (id) => {
    setSelectedID(id);

    if (hiddenHeigth === 0) {
      setHiddenHeigth(150);
    } else {
      setHiddenHeigth(0);
    }
  };

  const releaseMoreInfoAnimations = () => {
    setHiddenHeigth(0);
  };

  useEffect(() => {
    if (selectedID !== itinerary.id) {
      releaseMoreInfoAnimations();
    }
  }, [selectedID]);

  const flipMap = async (siteList) => {
    setSitesArray(siteList);
    let itinerizedDiveSites = await getDiveSitesByIDs(siteList);

    let lats = [];
    let lngs = [];
    itinerizedDiveSites.forEach((site) => {
      lats.push(site.lat);
      lngs.push(site.lng);
    });
    let lat = lats.reduce((acc, curr) => acc + curr, 0) / lats.length;
    let lng = lngs.reduce((acc, curr) => acc + curr, 0) / lngs.length;

    setMapConfig(2);
    mapRef?.panTo({ lat, lng });
    modalPause();
  };

  return (
    <div className={style.masterBox} key={itinerary.id}>
      <div className={style.shadowbox}>
        <div className={style.moreBox}>
          <p className={style.tripName}>{itinerary.tripName}</p>
          <p
            className={style.opener}
            onClick={() => startMoreInfoAnimation(itinerary.id)}
          >
            More Info
          </p>
        </div>
        <div className={style.buttonBox}>
          <ButtonIcon
            icon={<Icon name="anchor" />}
            className={`btn-lg ${style.buttonStyling}`}
            onClick={() => flipMap(itinerary.siteList)}
          />
          <ButtonIcon
            icon={<Icon name="diving-scuba-flag" />}
            className={`btn-lg ${style.buttonStyling}`}
          />
        </div>
      </div>
      <animated.div className={style.extraBox} style={heightChange}>
        <div className={style.topRail}>
          <p className={style.dateText}>
            {itinerary.startDate}
            {` ${t('to')} `}
            {itinerary.endDate}
          </p>
          <p className={style.priceText}>{itinerary.price }</p>
        </div>

        <p className={style.lowerText}>{itinerary.description}</p>
      </animated.div>
    </div>
  );
}
