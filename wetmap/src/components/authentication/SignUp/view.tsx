import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import TextInput from '../../reusables/textInput';
import SecureTextInput from '../../reusables/secureTextInput';
import { useTranslation } from 'react-i18next';

type SignUpPageProps = {
  goToSlide: (pageNumber: number) => void
  onSubmit:  (data: Form) => void
};

export default function SignUpPageView(props: SignUpPageProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const { t } = useTranslation();

  return (
    <div className="flex-column-between full-height">
      <div className="mt-10">
        <ButtonIcon
          icon={<Icon name="chevron-left" color="lightgrey" style={{ scale: '2' }} />}
          className="btn-lg"
          onClick={() => props.goToSlide(1)}
        />
        <h1 className="text-clip">{t('SignUpPage.title')}</h1>

        <form
          className="mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.fullName}
              iconLeft={<Icon name="person" />}
              placeholder={t('SignUpPage.namePlaceholder')}
              {...register('fullName', FormRules.fullName)}
            />
          </div>

          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={t('SignUpPage.emailPlaceholder')}
              {...register('email', FormRules.email)}
            />
          </div>

          <div className="mt-10">
            <SecureTextInput
              error={errors.password}
              placeholder={t('SignUpPage.passwordPlaceholder')}
              {...register('password', FormRules.password)}
            />
          </div>

          <div className="cols">
            <div className="col-8" />
            <div className="col-4">
              <Button
                disabled={isSubmitting}
                className="btn-lg bg-primary mt-10 col-3"
                type="submit"
                iconRight={<Icon name="chevron-right" />}
              >
                {t('SignUpPage.buttonText')}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="text-center mb-6">
        {t('SignUpPage.promptText')}
        { ' '}
        <a onClick={() => props.goToSlide(2)}>
          {`${t('SignUpPage.promptLinkText')}`}
        </a>
      </div>

    </div>
  );
};
