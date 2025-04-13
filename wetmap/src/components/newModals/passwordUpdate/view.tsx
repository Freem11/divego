import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import SecureTextInput from '../../reusables/secureTextInput';
import Icon from '../../../icons/Icon';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import backGroundPic from '../../../images/blackManta.png';
import Button from '../../reusables/button';
import { useTranslation } from 'react-i18next';

type PasswordUpdateProps = {
  onSubmit:     (data: Form) => void
  onClose:      () => void
  revealRoutes: boolean
  runningOn:    string | null
};

export default function PasswordUpdateView(props: PasswordUpdateProps) {
  const { t } = useTranslation();
  const { register, watch, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    shouldFocusError: false,
  });

  const validate = (value: string) => {
    if (watch('password1') != value) {
      return t('PasswordUpdate.passwordsDoNotMatch');
    }
  };

  return (

    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic} onClose={props.onClose} />

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <div className="d-flex">
            <h1 className="text-clip">{t('PasswordUpdate.header')}</h1>
          </div>

          <div className="stack-4 mb-2">
            <SecureTextInput
              error={errors.password1}
              placeholder={t('PasswordUpdate.password1Placeholder')}
              {...register('password1', FormRules.password1)}
            />

            <SecureTextInput
              error={errors.password2}
              placeholder={t('PasswordUpdate.password2Placeholder')}
              {...register('password2', { validate })}
            />
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
                {t('PasswordUpdate.submitButton')}
              </Button>
            </div>
          </div>

          {props.revealRoutes && (
            <div className="flex-column-between mt-10">
              <a onClick={props.onClose}>Continue on Desktop?</a>
              <p className="mb-0">or</p>

              {props.runningOn === 'Android' || props.runningOn === 'iOS'
                ? <a href="scubaseasons://">Continue on Mobile?</a>
                : (
                    <div className="flex-column-between mt-10">
                      <a href="https://play.google.com/store/apps/details?id=com.freem11.divegomobile"  target="_blank" rel="noreferrer">Available for Android</a>
                      <a href="https://apps.apple.com/us/app/divego/id6450968950" target="_blank" rel="noreferrer">Available for iOS</a>
                    </div>
                  )}
            </div>
          )}

        </div>
      </form>
    </div>

  );
};
