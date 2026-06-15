import React, { useContext, useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { MapContext } from '../../mapContext';
import iconConfig from '../../../../icons/_config.json';

type MarkerDiveSiteHaloProps = {
  id:          number
  title:       string
  position:    google.maps.LatLngLiteral
  score?:      number
  siteNumber?: number
};

function getHaloConfig(score: number) {
  if (score >= 35) {
    return {
      sizes:     [48, 36, 24, 12],
      opacities: [0.5, 0.65, 0.8, 0.9],
    };
  }

  if (score >= 20) {
    return {
      sizes:     [36, 24, 12],
      opacities: [0.5, 0.65, 0.8],
    };
  }

  if (score >= 10) {
    return {
      sizes:     [24, 12],
      opacities: [0.5, 0.65],
    };
  }

  return {
    sizes:     [12],
    opacities: [0.5],
  };
}

export function MarkerDiveSiteHalo(props: MarkerDiveSiteHaloProps) {
  const { modalShow } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapConfig } = useContext(MapContext);

  const isSelected = sitesArray.map(Number).includes(Number(props.id));
  const score = props.score ?? 0;

  const icon = useMemo(() => {
    const { sizes, opacities } = getHaloConfig(score);
    const maxSize = Math.max(...sizes, 30);
    const center = maxSize / 2;
    const anchorPath = iconConfig.anchor[1];
    const anchorColor = isSelected ? 'gold' : 'white';

    const rings = sizes
      .map((size, index) => {
        const radius = size / 2;

        return `
          <circle
            cx="${center}"
            cy="${center}"
            r="${radius}"
            fill="gold"
            opacity="${opacities[index]}"
          />
        `;
      })
      .join('');

    const svg = `
      <svg width="${maxSize}" height="${maxSize}" viewBox="0 0 ${maxSize} ${maxSize}" xmlns="http://www.w3.org/2000/svg">
        ${rings}
        <svg x="${center - 15}" y="${center - 15}" width="30" height="30" viewBox="0 0 512 512">
          <path
            style="transform: scale(0.85); transform-origin: center"
            fill="${anchorColor}"
            d="${anchorPath}"
          />
        </svg>
      </svg>
    `;

    return {
      url:        'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(maxSize, maxSize),
      anchor:     new google.maps.Point(center, center),
    };
  }, [score, isSelected]);

  function handleClick() {
    // Web mapConfig 3 = Create Trip Sites List
    if (mapConfig === 3) {
      setSitesArray((prev) => {
        const exists = prev.map(Number).includes(Number(props.id));

        return exists
          ? prev.filter(id => Number(id) !== Number(props.id))
          : [...prev, props.id];
      });

      return;
    }

    modalShow(DiveSite, {
      id:   props.id,
      size: 'large',
    });
  }

  return (
    <Marker
      icon={icon}
      title={props.title}
      position={props.position}
      zIndex={isSelected ? 999 : Math.max(1, score)}
      onClick={handleClick}
    />
  );
}
