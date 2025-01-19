import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import { Form, FormRules } from './form';
import { useForm } from 'react-hook-form';
import Button from '../../reusables/button/button';


type TripCreatorViewProps = {
  onClose?:     () => void
  values?:      Form
  isEditModeOn: boolean
  onSubmit:     (data: Form) => void
  priceChange:  (data: any) => void
};

export default function TripCreatorView(props: TripCreatorViewProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values: props.values,
  });

  return (
    <div className="full-height" style={{ paddingBottom: '4.5rem' }}>

      <div className={styles.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className="btn-lg text-gray ml-4 mt-4"
          onClick={props.onClose}
        />
      </div>

      <div className="flex-column-between full-height mb-6 mr-6">
        {
          props.isEditModeOn
            ? (<h1 className="mt-4 text-bold">{screenData.TripCreator.headerEdit}</h1>)
            : (<h1 className="mt-4 text-bold">{screenData.TripCreator.header}</h1>)
        }

        <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
          <div className="stack-4 mb-2">

            <TextInput
              iconLeft={<Icon name="store" />}
              placeholder={screenData.TripCreator.tripNamePlaceholder}
              error={errors.Name}
              {...register('Name', FormRules.Name)}
            />

            <TextInput
              iconLeft={<Icon name="at" />}
              placeholder={screenData.TripCreator.bookingLinkPlaceholder}
              error={errors.Link}
              {...register('Link', FormRules.Link)}
            />


            <TextInput
              iconLeft={<Icon name="diving-scuba-flag" />}
              placeholder={screenData.TripCreator.pricePlaceholder}
              error={errors.Price}
              {...register('Price', FormRules.Price)}
              onChange={props.priceChange}
            />

            <TextInput
              iconLeft={<Icon name="calendar-month" />}
              placeholder={screenData.TripCreator.startDatePlaceholder}
              error={errors.Start}
              type="date"
              {...register('Start', FormRules.Start)}
            />

            <TextInput
              iconLeft={<Icon name="calendar-month" />}
              placeholder={screenData.TripCreator.endDatePlaceholder}
              error={errors.End}
              type="date"
              {...register('End', FormRules.End)}
            />

            <textarea
              placeholder={screenData.TripCreator.tripDescriptionPlaceholder}
              {...register('Details')}
            />
          </div>
          <div className="cols mx-0">
            <div className="col-9"></div>
            <div className="col-3">
              <Button
                disabled={isSubmitting}
                className="btn-md bg-primary"
                type="submit"
                iconRight={<Icon name="chevron-right" />}
              >
                {screenData.TripCreator.submitButton}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
