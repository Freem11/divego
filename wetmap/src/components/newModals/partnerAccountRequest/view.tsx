import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import { Form, FormRules } from './form';
import style from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import { toast } from 'react-toastify';
import Tooltip from '../../reusables/tooltip';
import ScreenData from '../screenData.json';

type PartnerAccountRequestViewProps = {
  values?:  Form
  onClose:  () => void
  onSubmit: (data: Form) => void
};

export default function PartnerAccountRequestView(props: PartnerAccountRequestViewProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values: props.values,
  });

  const handleError = (errors: FieldErrors<Form>) => {
    toast.dismiss();
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit = (data: Form) => {
    toast.dismiss();
    props.onSubmit(data);
  };

  return (
    <div className="flex-column-between full-height">
      <div className={style.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" fill="darkgray" />}
          className="btn-lg"
          onClick={props.onClose}
        />
      </div>
      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(onSubmit, handleError)}>
        <div>
          <h1>{screenData.PartnerRequestPage.header}</h1>
          <div className={style.explanation}>{screenData.PartnerRequestPage.explanation}</div>
        </div>

        <TextInput
          iconLeft={(
            <Tooltip content={ScreenData.PartnerRequestPage.businesNameTooltip}>
              <Icon name="store" />
            </Tooltip>
          )}
          placeholder={screenData.PartnerRequestPage.businessPlaceholder}
          error={errors.BusinessName}
          {...register('BusinessName', FormRules.BusinessName)}
        />

        <TextInput
          iconLeft={(
            <Tooltip content={ScreenData.PartnerRequestPage.websiteTooltip}>
              <Icon name="monitor-dashboard" />
            </Tooltip>
          )}
          placeholder={screenData.PartnerRequestPage.websitePlaceholder}
          error={errors.WebsiteLink}
          {...register('WebsiteLink', FormRules.WebsiteLink)}
        />

        <TextInput
          iconLeft={(
            <Tooltip content={ScreenData.PartnerRequestPage.mapTooltip}>
              <Icon name="latitude"  />
            </Tooltip>
          )}
          placeholder={screenData.PartnerRequestPage.latPlaceholder}
          error={errors.Latitude}
          {...register('Latitude', FormRules.Latitude)}
        />


        <TextInput
          iconLeft={(
            <Tooltip content={ScreenData.PartnerRequestPage.mapTooltip}>
              <Icon name="longitude" />
            </Tooltip>
          )}
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
