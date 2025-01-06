import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import SecureTextInput from '../../reusables/secureTextInput';
import Icon from '../../../icons/Icon';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import backGroundPic from '../../../images/blackManta.png';
import Button from '../../reusables/button';
import screenData from '../screenData.json';

type PasswordUpdateProps = {
  onSubmit: (data: Form) => void
  onClose:  () => void
};

export default function PasswordUpdateView(props: PasswordUpdateProps) {
  const { register, watch, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    shouldFocusError: false,
  });

  const validate = (value: string) => {
    if (watch('password1') != value) {
      return screenData.PasswordUpdate.passwordsDoNotMatch;
    }
  };

  return (

    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic} onClose={props.onClose} />

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <div className="d-flex">
            <h1 className="text-clip">{screenData.PasswordUpdate.header}</h1>
          </div>

          <div className="stack-4 mb-2">
            <SecureTextInput
              error={errors.password1}
              placeholder={screenData.PasswordUpdate.password1Placeholder}
              {...register('password1', FormRules.password1)}
            />

            <SecureTextInput
              error={errors.password2}
              placeholder={screenData.PasswordUpdate.password2Placeholder}
              {...register('password2', { validate })}
            />
          </div>

        </div>
        <div className="cols mx-0">
          <div className="col-9"></div>
          <div className="col-3">
            <Button
              disabled={isSubmitting}
              className="btn-md bg-primary"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.PasswordUpdate.submitButton}
            </Button>
          </div>
        </div>
      </form>
    </div>

  );
};
