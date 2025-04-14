import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import TextInput from '../../reusables/textInput';
import { Form, FormRules } from './form';
import { FieldErrors, useForm } from 'react-hook-form';
import Button from '../../reusables/button';
import Label from '../../reusables/label';
import PriceTextInput from '../../reusables/priceTextInput';
import SiteSelector from '../../reusables/siteSelector';
import Tooltip from '../../reusables/tooltip';
import { useTranslation } from 'react-i18next';

type TripCreatorViewProps = {
  values?:         Form
  onClose?:        () => void
  onSubmit:        (data: Form) => void
  handleError:     (errors: FieldErrors<Form>) => void
  diveSitesError:  boolean
  isEditModeOn:    boolean
  setIsEditModeOn: React.Dispatch<React.SetStateAction<boolean>>
};

export default function TripCreatorView(props: TripCreatorViewProps) {
  const { register, watch, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({ values: props.values });
  const startDate = watch('Start'); // Get start date value from form
  const endDate = watch('End'); // Get end date value from form
  const { t } = useTranslation();

  const cloneButtonPress = () => {
    props.setIsEditModeOn(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonBack}>
        <ButtonIcon
          className={styles.buttonBack}
          icon={<Icon name="chevron-left" />}
          onClick={props.onClose}
        />
      </div>

      <div className="cols col-12 flex-row">
        {props.isEditModeOn && <div className="col-2"></div>}
        <div className={props.isEditModeOn ? 'col-8' : 'col-12'}>
          {
            props.isEditModeOn
              ? (<h2>{t('TripCreator.headerEdit')}</h2>)
              : (<h2>{t('TripCreator.header')}</h2>)
          }
        </div>
        {props.isEditModeOn
        && (
          <div className="col-2 mb-4">
            <Button
              onClick={() => cloneButtonPress()}
              type="button"
            >
              {t('TripCreator.cloneTripButton')}
            </Button>
          </div>
        )}

      </div>

      <form onSubmit={handleSubmit(props.onSubmit, props.handleError)} className={styles.form}>
        <div className={styles.formColumns}>
          <div className={styles.formColumn}>
            <Label label={t('TripCreator.tripNameLabel')}>
              <TextInput
                iconLeft={(
                  <Tooltip content={t('TripCreator.tripNameTooltip')}>
                    <Icon name="store" />
                  </Tooltip>
                )}
                placeholder={t('TripCreator.tripNamePlaceholder')}
                error={errors.Name}
                {...register('Name', FormRules.Name)}
              />
            </Label>

            <Label label={t('TripCreator.bookingLinkLabel')}>
              <TextInput
                iconLeft={(
                  <Tooltip content={t('TripCreator.booklingLinkTooltip')}>
                    <Icon name="link" />
                  </Tooltip>
                )}
                placeholder={t('TripCreator.bookingLinkPlaceholder')}
                error={errors.Link}
                {...register('Link', FormRules.Link)}
              />
            </Label>

            <Label label={t('TripCreator.priceLabel')}>
              <PriceTextInput
                iconLeft={(
                  <Tooltip content={t('TripCreator.priceTooltip')}>
                    <Icon name="currency-usd" />
                  </Tooltip>
                )}
                placeholder={t('TripCreator.pricePlaceholder')}
                error={errors.Price}
                {...register('Price', FormRules.Price)}
              />
            </Label>

            <Label label={t('TripCreator.startDateLabel')}>
              <TextInput
                iconLeft={(
                  <Tooltip content={t('TripCreator.tripStartTooltip')}>
                    <Icon name="calendar-start" />
                  </Tooltip>
                )}
                placeholder={t('TripCreator.startDatePlaceholder')}
                error={errors.Start}
                type="date"
                {...register('Start',
                  { required: t('Validators.requiredStartDate'),
                    validate: (value) => {
                      if (!endDate || !value) return true;
                      const end = new Date(endDate);
                      const start = new Date(value);
                      return end >= start || t('Validators.startBeforeEndDate');
                    },
                  })}
                max={endDate}
              />
            </Label>

            <Label label={t('TripCreator.endDateLabel')}>
              <TextInput
                iconLeft={(
                  <Tooltip content={t('TripCreator.tripEndTooltip')}>
                    <Icon name="calendar-end" />
                  </Tooltip>
                )}
                placeholder={t('TripCreator.endDatePlaceholder')}
                error={errors.End}
                type="date"
                {...register('End',
                  { required: t('Validators.requiredEndDate'),
                    validate: (value) => {
                      if (!startDate || !value) return true;
                      const start = new Date(startDate);
                      const end = new Date(value);
                      return end >= start || t('Validators.endBeforeStartDate');
                    },
                  })}
                min={startDate}
              />
            </Label>

          </div>
          <div className={styles.formColumn}>
            <Label label={t('TripCreator.diveSitesLabel')}>
              <SiteSelector error={props.diveSitesError} />
            </Label>
            <Label label="Details" className={styles.detailsField}>
              <textarea
                className={`${styles.textarea} ${errors.Details && styles.textareaError}`}
                placeholder={t('TripCreator.tripDescriptionPlaceholder')}
                {...register('Details', FormRules.Details)}
              />
            </Label>
          </div>
        </div>
        <div className={styles.formBottom}>
          <div className={styles.buttonWrapper}>
            <Button
              className="btn-primary w-fit"
              disabled={isSubmitting}
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {t('TripCreator.submitButton')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
