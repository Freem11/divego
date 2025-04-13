import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import TextInput from '../../reusables/textInput';
import { useTranslation } from 'react-i18next';

type PasswordRecoveryProps = {
  goToSlide: (pageNumber: number) => void
  onSubmit:  (data: Form) => void
};

export default function PasswordRecoveryView(props: PasswordRecoveryProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const { t } = useTranslation();

  return (
    <div className="flex-column-between full-height">
      <div className="mt-10">
        <ButtonIcon
          icon={<Icon name="chevron-left" color="lightgrey" style={{ scale: '2' }} />}
          className="btn-lg"
          onClick={() => props.goToSlide(2)}
        />
        <h1>{t('PasswordRecoveryPage.title')}</h1>

        <form
          className="mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={t('PasswordRecoveryPage.emailPlaceholder')}
              {...register('email', FormRules.email)}
            />
          </div>

          <div className="d-flex justify-end">
            <Button
              disabled={isSubmitting}
              className="btn-lg bg-primary mt-10 flex-fit"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {t('PasswordRecoveryPage.buttonText')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
