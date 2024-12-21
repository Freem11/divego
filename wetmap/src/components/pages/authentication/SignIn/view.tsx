import React, { Dispatch, SetStateAction } from 'react';
// import style from './style.module.scss';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../../reusables/button';
import Icon from '../../../../icons/Icon';
import ButtonIcon from '../../../reusables/buttonIcon';
import carouselData from '../carousel-data.json';
import TextInput from '../../../reusables/textInput';

type LogInPageProps = {
  goToSlide:          (pageNumber: number) => void
  onSubmit:           (data: Form) => void
  secureTextEntry:    boolean
  setSecureTextEntry: (value: boolean) => void
  loginFail:          string | null
  setLoginFail:       Dispatch<SetStateAction<string | null>>

};

export default function LogInPageView(props: LogInPageProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  return (
    <div className="mt-10">
      <ButtonIcon
        icon={<Icon name="chevron-left" color="lightgrey" style={{ scale: '2' }} />}
        className="btn-lg"
        onClick={() => props.goToSlide(1)}
      />

      <div className="mt-10">
        <h1>{carouselData.SignInPage.title}</h1>

        <form
          className="flex-column-between mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={carouselData.SignInPage.emailPlaceholder}
              onFocus={() => props.setLoginFail(null)}
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
              placeholder={carouselData.SignInPage.passwordPlaceholder}
              onFocus={() => props.setLoginFail(null)}
              {...register('password', FormRules.password)}
            />
          </div>

          {props.loginFail && <p className="erroMsg">{props.loginFail}</p>}

          <div className="cols">
            <div className="col-8" />
            <div className="col-4">
              <Button
                disabled={isSubmitting}
                className="btn-lg bg-primary mt-10 col-3"
                type="submit"
                iconRight={<Icon name="chevron-right" />}
              >
                {carouselData.SignInPage.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <p style={{ width: '100%', position: 'fixed', bottom: 10 }}>
        {carouselData.SignInPage.promptText}
        <span
          style={{
            cursor:         'pointer',
            color:          'blue',
            textDecoration: 'none',
          }}
          onClick={() => props.goToSlide(0)}
        >
          {` ${carouselData.SignInPage.promptLinkText}`}
        </span>
      </p>

    </div>
  );
};
