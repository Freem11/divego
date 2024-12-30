import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import carouselData from '../carousel-data.json';
import TextInput from '../../reusables/textInput';

type LogInPageProps = {
  goToSlide:          (pageNumber: number) => void
  onSubmit:           (data: Form) => void
  secureTextEntry:    boolean
  setSecureTextEntry: (value: boolean) => void
  submitFail:         string | null
  setSubmitFail:      Dispatch<SetStateAction<string | null>>
};

export default function LogInPageView(props: LogInPageProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  return (
    <div className="mt-10">
      <ButtonIcon
        icon={<Icon name="chevron-left" color="lightgrey" style={{ scale: '2' }} />}
        className="btn-lg"
        onClick={() => props.goToSlide(2)}
      />

      <div className="mt-10">
        <h1>{carouselData.PasswordRecoveryPage.title}</h1>

        <form
          className="flex-column-between mx-6 mb-6"
          onSubmit={handleSubmit(props.onSubmit)}
        >
          <div className="mt-10">
            <TextInput
              error={errors.email}
              iconLeft={<Icon name="at" />}
              placeholder={carouselData.PasswordRecoveryPage.emailPlaceholder}
              onFocus={() => props.setSubmitFail(null)}
              {...register('email', FormRules.email)}
            />
          </div>

          <a href="http://localhost:3000">Continue on Desktop</a>

          <a href="scubaseasons://">Continue on Mobile</a>

          {props.submitFail && <p className="erroMsg">{props.submitFail}</p>}

          <div className="cols">
            <div className="col-7" />
            <div className="col-5">
              <Button
                disabled={isSubmitting}
                className="btn-lg bg-primary mt-10 col-3"
                type="submit"
                iconRight={<Icon name="chevron-right" />}
              >
                {carouselData.PasswordRecoveryPage.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
