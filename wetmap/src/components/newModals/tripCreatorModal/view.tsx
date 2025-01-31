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
    <div className={styles.wrapper}>
      <div className={styles.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          onClick={props.onClose}
        />
      </div>

      {
        props.isEditModeOn
          ? (<h1>{screenData.TripCreator.headerEdit}</h1>)
          : (<h1>{screenData.TripCreator.header}</h1>)
      }

      <form onSubmit={handleSubmit(props.onSubmit)} className={styles.form}>
        <div className={styles.formColumns}>
          <div className={styles.formColumn}>
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
                iconLeft={<Icon name="link" />}
                placeholder={screenData.TripCreator.bookingLinkPlaceholder}
                error={errors.Link}
                {...register('Link', FormRules(startDate).Link)}
              />
            </Label>

            <Label label={screenData.TripCreator.priceLabel}>
              <PriceTextInput
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
                {...register('End',
                  { required: 'End date is required',
                    validate: (value) => {
                      if (!startDate || !value) return true;
                      const start = new Date(startDate);
                      const end = new Date(value);
                      return end >= start || 'End date must be after start date';
                    },
                  })}
                max={startDate}
              />

            </Label>
          </div>
          <div className={styles.formColumn}>
            <textarea
              placeholder={screenData.TripCreator.tripDescriptionPlaceholder}
              {...register('Details')}
            />
          </div>
        </div>
        <div className={styles.formBottom}>
          <Button
            disabled={isSubmitting}
            type="submit"
            iconRight={<Icon name="chevron-right" />}
          >
            {screenData.TripCreator.submitButton}
          </Button>
        </div>
      </form>
    </div>
  );
}
