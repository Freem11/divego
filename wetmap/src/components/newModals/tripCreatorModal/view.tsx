import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import { Form, FormRules } from './form';
import { FieldErrors, useForm } from 'react-hook-form';
import Button from '../../reusables/button/button';
import Label from '../../reusables/label';
import PriceTextInput from '../../reusables/priceTextInput';
import { toast } from 'react-toastify';

type TripCreatorViewProps = {
  onClose?:     () => void
  isEditModeOn: boolean
  onSubmit:     (data: Form) => void
};

export default function TripCreatorView(props: TripCreatorViewProps) {
  const { register, watch, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  const startDate = watch('Start');

    const handleError = (errors: FieldErrors<Form>) => {
      toast.dismiss();
      Object.values(errors).forEach((error) => {
        if (error?.message) {
          toast.error(error.message);
        }
      });
    };
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

        <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit,handleError)} style={{ overflowY: 'scroll' }}>
          <div className="stack-4 mb-2">
            <Label label={screenData.TripCreator.tripNameLabel}>
              <TextInput
                iconLeft={<Icon name="store" />}
                placeholder={screenData.TripCreator.tripNamePlaceholder}
                error={errors.Name}
                {...register('Name', FormRules(startDate).Name)}
              />
            </Label>

            <Label label={screenData.TripCreator.bookingLinkLabel}>
              <TextInput
                iconLeft={<Icon name="at" />}
                placeholder={screenData.TripCreator.bookingLinkPlaceholder}
                error={errors.Link}
                {...register('Link', FormRules(startDate).Link)}
              />
            </Label>

            <Label label={screenData.TripCreator.priceLabel}>
              <PriceTextInput
                iconLeft={<Icon name="currency-usd" />}
                placeholder={screenData.TripCreator.pricePlaceholder}
                error={errors.Price}
                {...register('Price', FormRules(startDate).Price)}
              />
            </Label>

            <Label label={screenData.TripCreator.startDateLabel}>
              
              <TextInput
                iconLeft={<Icon name="calendar-start" />}
                placeholder={screenData.TripCreator.startDatePlaceholder}
                error={errors.Start}
                type="date"
                {...register('Start', FormRules(startDate).Start)}
              />
            
            </Label>
            

            <Label label={screenData.TripCreator.endDateLabel}>
              <TextInput
                iconLeft={<Icon name="calendar-end" />}
                placeholder={screenData.TripCreator.endDatePlaceholder}
                error={errors.End}
                type="date"
                {...register('End', FormRules(startDate).End)}
              />
            </Label>

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
                className="btn-lg bg-primary"
                type="submit"
                iconRight={<Icon name="chevron-right" />}
              >
                {/* {screenData.TripCreator.submitButton}
                 */}
                 Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
