import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import screenData from '../../newModals/screenData.json';
import TextInput from '../../reusables/textInput';
import SecureTextInput from '../../reusables/secureTextInput';

type SignUpPageProps = {
  goToSlide: (pageNumber: number) => void
  onSubmit:  (data: Form) => void
};

export default function SignUpPageView(props: SignUpPageProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  return (
    <div className="flex-column-between full-height">
      <div className="mt-10">
        <ButtonIcon
          icon={<Icon name="chevron-left" color="lightgrey" style={{ scale: '2' }} />}
          className="btn-lg"
          onClick={() => props.goToSlide(1)}
        />
        <h1 className="text-clip">{screenData.SignUpPage.title}</h1>

        <form
          className="mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.fullName}
              iconLeft={<Icon name="person" />}
              placeholder={screenData.SignUpPage.namePlaceholder}
              {...register('fullName', FormRules.fullName)}
            />
          </div>

          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={screenData.SignUpPage.emailPlaceholder}
              {...register('email', FormRules.email)}
            />
          </div>

          <div className="mt-10">
            <SecureTextInput
              error={errors.password}
              placeholder={screenData.SignUpPage.passwordPlaceholder}
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
                {screenData.SignUpPage.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <p>
        {screenData.SignUpPage.promptText}
        { ' '}
        <a onClick={() => props.goToSlide(2)}>
          {`${screenData.SignUpPage.promptLinkText}`}
        </a>
      </p>

    </div>
  );
};
