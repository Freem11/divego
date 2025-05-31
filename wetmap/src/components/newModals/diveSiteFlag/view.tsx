import React from 'react';
import { useForm } from 'react-hook-form';

import { DiveSiteWithUserName } from '../../../entities/diveSite';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import FlagOption from '../../reusables/flagOption';
import TextInput from '../../reusables/textInput';
import screenData from '../screenData.json';
import { Form } from './form';
import style from './style.module.scss';
import Button from '../../reusables/button';

type DiveSiteFlagViewProps = {
  diveSite:          DiveSiteWithUserName | null
  onClose:           () => void
  selectedReason:    number | null
  setSelectedReason: (reason: number) => void
  onSubmit:          (data: Form) => void
};

export default function DiveSiteFlagView(props: DiveSiteFlagViewProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Form>();

  const flagOptions = [
    {
      title:    screenData.DiveSiteFlag.flagReasons.incorrectName,
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
      title:    screenData.DiveSiteFlag.flagReasons.incorrectCoordinates,
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

  const headerText = `Report issue with Dive Site: "${props.diveSite?.name}" at Latitude: ${props.diveSite?.lat} Longitude: ${props.diveSite?.lng}`;

  return (
    <div className="full-height" style={{ paddingBottom: '4.5rem' }}>
      <ButtonIcon
        type="button"
        icon={<Icon name="chevron-left" />}
        className={`btn-lg text-gray ml-4 mt-4 ${style.buttonBack}`}
        onClick={props.onClose}
      />

      <form className="flex-column-between full-height mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div className="mx-10 text-left">
          <h1 className="mt-4">{headerText}</h1>
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
        <div className={style.submitButton}>
          <Button disabled={isSubmitting} className="btn-lg">
            <span className="hide-sm">
              {screenData.DiveSiteFlag.submitButton}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
