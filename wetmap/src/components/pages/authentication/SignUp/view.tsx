import React from 'react';
// import style from './style.module.scss';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../../reusables/button';
import Icon from '../../../../icons/Icon';
import ButtonIcon from '../../../reusables/buttonIcon';
import carouselData from '../carousel-data.json';
import TextInput from '../../../reusables/textInput';

type SignUpPageProps = {
  goToSlide:          (pageNumber: number) => void
  onSubmit:           (data: Form) => void
  secureTextEntry:    boolean
  setSecureTextEntry: (value: boolean) => void
};

export default function SignUpPageView(props: SignUpPageProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  return (
    <div>
      <ButtonIcon
        icon={<Icon name="chevron-left" />}
        className="btn-lg"
        onClick={() => props.goToSlide(2)}
      />

      <h1 className="text-clip">{carouselData.SignUpPage.title}</h1>

      <form
        className="flex-column-between mx-6 mb-6"
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <div style={{ backgroundColor: 'white' }}>
          <TextInput
            error={errors.fullname}
            iconLeft={<Icon name="person" />}
            placeholder={carouselData.SignUpPage.namePlaceholder}
            {...register('fullname', FormRules.fullname)}
          />
        </div>

        <div style={{ backgroundColor: 'white' }}>
          <TextInput
            error={errors.email}
            iconLeft={<Icon name="at" />}
            placeholder={carouselData.SignUpPage.emailPlaceholder}
            {...register('email', FormRules.email)}
          />
        </div>

        <div style={{ backgroundColor: 'white' }}>
          <TextInput
            error={errors.password}
            type={props.secureTextEntry ? 'password' : 'text'}
            iconLeft={<Icon name="lock-outline" />}
            iconRight={
              props.secureTextEntry
                ? (
                    <Icon
                      name="eye-off"
                      onClick={() => props.setSecureTextEntry(false)}
                    />
                  )
                : (
                    <Icon name="eye" onClick={() => props.setSecureTextEntry(true)} />
                  )
            }
            placeholder={carouselData.SignUpPage.passwordPlaceholder}
            {...register('password', FormRules.password)}
          />
        </div>

        <Button
          disabled={isSubmitting}
          className="btn-lg bg-primary w-25"
          type="submit"
          iconRight={<Icon name="chevron-right" />}
        >
          {carouselData.SignUpPage.buttonText}
        </Button>

        <p>
          {carouselData.SignUpPage.promptText}
          <span
            style={{
              cursor:         'pointer',
              color:          'blue',
              textDecoration: 'none',
            }}
            onClick={() => props.goToSlide(2)}
          >
            {carouselData.SignUpPage.promptLinkText}
          </span>
        </p>
      </form>
    </div>
  );
};
