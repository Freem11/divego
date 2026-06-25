import React, { useContext, useMemo } from 'react';
import { OverlayView } from '@react-google-maps/api';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { MapContext } from '../../mapContext';
import anchorWhite from '../../../../images/AnchorWhite.png';
import anchorGold from '../../../../images/AnchorGold.png';

type MarkerDiveSiteHaloProps = {
  id:          number
  title:       string
  position:    google.maps.LatLngLiteral
  score?:      number
  siteNumber?: number
};

const ICON_SIZE = 28;

function getHaloConfig(score: number) {
  if (score >= 35) {
    return {
      sizes:     [48, 36, 24, 12],
      opacities: [0.5, 0.65, 0.8, 0.9],
      zIndex:    20,
    };
  }

  if (score >= 20) {
    return {
      sizes:     [36, 24, 12],
      opacities: [0.5, 0.65, 0.8],
      zIndex:    15,
    };
  }

  if (score >= 10) {
    return {
      sizes:     [24, 12],
      opacities: [0.5, 0.65],
      zIndex:    10,
    };
  }

  return {
    sizes:     [12],
    opacities: [0.5],
    zIndex:    5,
  };
}

function isSameSite(item: unknown, siteId: number) {
  if (typeof item === 'object' && item !== null && 'id' in item) {
    return Number((item as { id: number }).id) === Number(siteId);
  }

  return Number(item) === Number(siteId);
}

export function MarkerDiveSiteHalo(props: MarkerDiveSiteHaloProps) {
  const { modalShow } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapConfig } = useContext(MapContext);

  const isSelected = sitesArray.some(item => isSameSite(item, props.id));
  const score = props.score ?? 0;

  const { sizes, opacities, zIndex } = useMemo(
    () => getHaloConfig(score),
    [score],
  );

  const outerSize = Math.max(sizes[0], ICON_SIZE);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();

    // Web mapConfig 3 = Create Trip Sites List
    if (mapConfig === 3) {
      setSitesArray((prev) => {
        const exists = prev.some(item => isSameSite(item, props.id));

        return exists
          ? prev.filter(item => !isSameSite(item, props.id))
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
    <OverlayView
      position={props.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
      })}
    >
      <div
        title={props.title}
        onClick={handleClick}
        style={{
          position:       'relative',
          width:          outerSize,
          height:         outerSize,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          cursor:         'pointer',
          zIndex:         isSelected ? 999 : zIndex,
        }}
      >
        {sizes.map((size, index) => (
          <div
            key={`${size}-${index}`}
            style={{
              position:        'absolute',
              width:           size,
              height:          size,
              borderRadius:    '50%',
              backgroundColor: 'gold',
              opacity:         opacities[index],
            }}
          />
        ))}

        <img
          src={isSelected ? anchorGold : anchorWhite}
          alt={props.title}
          style={{
            position:      'absolute',
            width:         ICON_SIZE,
            height:        ICON_SIZE,
            objectFit:     'contain',
            pointerEvents: 'none',
            zIndex:        10,
          }}
        />
      </div>
    </OverlayView>
  );
}
