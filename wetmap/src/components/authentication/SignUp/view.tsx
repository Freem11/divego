import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import carouselData from '../carousel-data.json';
import TextInput from '../../reusables/textInput';

type SignUpPageProps = {
  goToSlide:          (pageNumber: number) => void
  onSubmit:           (data: Form) => void
  secureTextEntry:    boolean
  setSecureTextEntry: (value: boolean) => void
  regFail:            string | null
  setRegFail:         Dispatch<SetStateAction<string | null>>
};

export default function SignUpPageView(props: SignUpPageProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  return (
    <div className="mt-10">
      <ButtonIcon
        icon={<Icon name="chevron-left" color="lightgrey" style={{ scale: '2' }} />}
        className="btn-lg"
        onClick={() => props.goToSlide(1)}
      />

      <div className="mt-10">
        <h1 className="text-clip">{carouselData.SignUpPage.title}</h1>

        <form
          className="flex-column-between mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.fullname}
              iconLeft={<Icon name="person" />}
              placeholder={carouselData.SignUpPage.namePlaceholder}
              onFocus={() => props.setRegFail(null)}
              {...register('fullname', FormRules.fullname)}
            />
          </div>

          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={carouselData.SignUpPage.emailPlaceholder}
              onFocus={() => props.setRegFail(null)}
              {...register('email', FormRules.email)}
            />
          </div>

          <div className="mt-10">
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
              onFocus={() => props.setRegFail(null)}
              {...register('password', FormRules.password)}
            />
          </div>

          {props.regFail && <p className="erroMsg">{props.regFail}</p>}

          <div className="cols">
            <div className="col-8" />
            <div className="col-4">
              <Button
                disabled={isSubmitting}
                className="btn-lg bg-primary mt-10 col-3"
                type="submit"
                iconRight={<Icon name="chevron-right" />}
              >
                {carouselData.SignUpPage.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <p style={{ width: '100%', position: 'fixed', bottom: 10 }}>
        {carouselData.SignUpPage.promptText}
        <span
          style={{
            cursor:         'pointer',
            color:          'blue',
            textDecoration: 'none',
          }}
          onClick={() => props.goToSlide(2)}
        >
          {` ${carouselData.SignUpPage.promptLinkText}`}
        </span>
      </p>

    </div>
  );
};
