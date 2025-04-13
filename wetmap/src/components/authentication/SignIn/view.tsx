import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import TextInput from '../../reusables/textInput';
import SecureTextInput from '../../reusables/secureTextInput';
import { useTranslation } from 'react-i18next';

type SignInPageProps = {
  goToSlide: (pageNumber: number) => void
  onSubmit:  (data: Form) => void
};

export default function SignInPageView(props: SignInPageProps) {
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
        <h1>{t('SignInPage.title')}</h1>

        <form
          className="mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={t('SignInPage.emailPlaceholder')}
              {...register('email', FormRules.email)}
            />
          </div>

          <div className="mt-10">
            <SecureTextInput
              error={errors.password}
              placeholder={t('SignInPage.passwordPlaceholder')}
              {...register('password', FormRules.password)}
            />
          </div>

          <div className="d-flex justify-end">
            <Button
              disabled={isSubmitting}
              className="btn-lg bg-primary mt-10 flex-fit"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {t('SignInPage.buttonText')}
            </Button>
          </div>
        </form>
      </div>

      <div className="text-center mb-6">
        <div>
          <a onClick={() => props.goToSlide(3)}>
            {t('SignInPage.passwordReset')}
          </a>
        </div>

        <div>
          {t('SignInPage.promptText')}
          <a onClick={() => props.goToSlide(0)}>
            {` ${t('SignInPage.promptLinkText')}`}
          </a>
        </div>
      </div>
    </div>
  );
};
