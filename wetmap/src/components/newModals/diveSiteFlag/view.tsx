import React from 'react';
import { useForm } from 'react-hook-form';

import { DiveSiteWithUserName } from '../../../entities/diveSite';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import FlagOption from '../../reusables/flagOption';
import TextInput from '../../reusables/textInput';
import screenData from '../screenData.json';
import { Form } from './form';
import styles from './style.module.scss';

type DiveSiteFlagViewProps = {
  diveSite:          DiveSiteWithUserName | null
  onClose:           () => void
  selectedReason:    number | null
  setSelectedReason: (reason: number) => void
};

export default function DiveSiteFlagView(props: DiveSiteFlagViewProps) {
  const { register } = useForm<Form>();

  const flagOptions = [
    {
      title:    'Dive site name not correct',
      children: (
        <div style={{ margin: '1rem 0' }}>
          <TextInput
            key="diveSiteName"
            iconLeft={<Icon name="diving-scuba-flag" />}
            placeholder={screenData.DiveSiteFlag.diveSiteNamePlaceholder}
            {...register('diveSiteName')}
          />
        </div>
      ),
    },
    {
      title:    'Dive site GPS coordinates are not correct',
      children: (
        <React.Fragment>
          <div style={{ margin: '1rem 0' }}>
            <TextInput
              key="diveSiteLatitude"
              iconLeft={<Icon name="latitude" />}
              placeholder={screenData.DiveSiteFlag.diveSiteLatitudePlaceholder}
              {...register('diveSiteLatitude')}
            />
          </div>
          <div style={{ margin: '1rem 0' }}>
            <TextInput
              key="diveSiteLongitude"
              iconLeft={<Icon name="longitude" />}
              placeholder={screenData.DiveSiteFlag.diveSiteLongitudePlaceholder}
              {...register('diveSiteLongitude')}
            />
          </div>
        </React.Fragment>
      ),
    },
  ];

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
          {flagOptions.map(({ title, children }, index) => (
            <FlagOption
              key={`flag-${index}`}
              title={`${index + 1}) ${title}`}
              index={index}
              selectedReason={props.selectedReason}
              setSelectedReason={props.setSelectedReason}
            >
              {children}
            </FlagOption>
          ))}
        </div>
      </div>
    </div>
  );
}
