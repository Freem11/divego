import screenData from '../screenData.json';
import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import FlagOption from '../../reusables/flagOption';

type DiveSiteFlagViewProps = {
  diveSite:          DiveSiteWithUserName | null
  onClose:           () => void
  selectedReason:    number | null
  setSelectedReason: (reason: number) => void
};

const flagOptions = [
  {
    title: 'Dive site name not correct',
  },
  {
    title: 'Dive site GPS coordinates are not correct',
  },
];

export default function DiveSiteFlagView(props: DiveSiteFlagViewProps) {
  return (
    <div className="full-height" style={{ paddingBottom: '4.5rem' }}>
      <ButtonIcon
        icon={<Icon name="chevron-left" />}
        className={`btn-lg text-gray ml-4 mt-4 ${styles.buttonBack}`}
        onClick={props.onClose}
      />

      <div className="flex-column-between full-height mb-6">
        <div className="mx-10 text-left">
          <h2 className="mt-4 text-bold">{`Reporting issue with Dive Site: "${props.diveSite?.name}" at Latitude: ${props.diveSite?.lat} Longitude: ${props.diveSite?.lng}`}</h2>
          <h3 className="ml-4 mt-2 mb-1">
            {screenData.DiveSiteFlag.subHeading1}
          </h3>
          {flagOptions.map(({ title }, index) => (
            <FlagOption
              key={`flag-${index}`}
              title={`${index + 1}) ${title}`}
              index={index}
              selectedReason={props.selectedReason}
              setSelectedReason={props.setSelectedReason}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
