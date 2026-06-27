import React, { useContext, useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import AnchorWhite from '../../../../images/AnchorWhite.png';
import AnchorGold from '../../../../images/AnchorGold.png';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { MapContext } from '../../mapContext';

type MarkerDiveSiteProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { modalShow } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapConfig } = useContext(MapContext);

  const isSelected = sitesArray.some((id) => Number(id) === Number(props.id));

  const icon = useMemo(() => ({
    url:        isSelected ? AnchorGold : AnchorWhite,
    scaledSize: new google.maps.Size(30, 30),
    anchor:     new google.maps.Point(15, 15),
  }), [isSelected]);

  function handleClick() {
    if (mapConfig !== 3) {
      modalShow(DiveSite, {
        id:   props.id,
        size: 'large',
      });

      return;
    }

    setSitesArray((prev) => {
      const exists = prev.some((id) => Number(id) === Number(props.id));

      return exists
        ? prev.filter(id => Number(id) !== Number(props.id))
        : [...prev, props.id];
    });
  }

  return (
    <Marker
      icon={icon}
      title={props.title}
      position={props.position}
      onClick={handleClick}
    />
  );
}
