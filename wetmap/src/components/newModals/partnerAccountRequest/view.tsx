import React from 'react';
import { useForm } from 'react-hook-form';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import { Form, FormRules } from './form';
import style from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';

type PartnerAccountRequestViewProps = {
  values?:  Form
  onClose:  () => void
  onSubmit: (data: Form) => void
};

export default function PartnerAccountRequestView(props: PartnerAccountRequestViewProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values: props.values,
  });

  return (
    <div className="flex-column-between full-height">
      <div className={style.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" fill="darkgray" />}
          className="btn-lg"
          onClick={props.onClose}
        />
      </div>
      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <h1>{screenData.PartnerRequestPage.header}</h1>
          <div className={style.explanation}>{screenData.PartnerRequestPage.explanation}</div>
        </div>

        <TextInput
          iconLeft={<Icon name="store" />}
          placeholder={screenData.PartnerRequestPage.businessPlaceholder}
          error={errors.BusinessName}
          {...register('BusinessName', FormRules.BusinessName)}
        />

        <TextInput
          iconLeft={<Icon name="monitor-dashboard" />}
          placeholder={screenData.PartnerRequestPage.websitePlaceholder}
          error={errors.WebsiteLink}
          {...register('WebsiteLink', FormRules.WebsiteLink)}
        />

        <TextInput
          iconLeft={<Icon name="latitude"  />}
          placeholder={screenData.PartnerRequestPage.latPlaceholder}
          error={errors.Latitude}
          {...register('Latitude', FormRules.Latitude)}
        />


        <TextInput
          iconLeft={<Icon name="longitude" />}
          placeholder={screenData.PartnerRequestPage.lngPlaceholder}
          error={errors.Longitude}
          {...register('Longitude', FormRules.Longitude)}
        />

        <div className="cols mx-0">
          <div className="col-9"></div>
          <div className="col-3">
            <Button
              disabled={isSubmitting}
              className="btn-md bg-primary"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.PartnerRequestPage.submitButton}
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
}
