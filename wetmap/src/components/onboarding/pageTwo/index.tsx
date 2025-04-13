import React, { useContext } from 'react';
import Icon from '../../../icons/Icon';
import TextInput from '../../reusables/textInput';
import { useForm } from 'react-hook-form';
import { Form, FormRules } from './form';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from '../style.module.scss';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { updateProfile } from '../../../supabaseCalls/accountSupabaseCalls';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


export default function PageTwo() {
  const { profile, initProfile } = useContext(UserProfileContext);
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const { slideForward } = useContext(SliderContext);
  const { t } = useTranslation();

  const onSubmit = async (data: Form) => {
    if (profile) {
      const response = await updateProfile({
        UserID:   profile.UserID,
        UserName: data.username,
      });

      if (!response.error) {
        initProfile(true);
        slideForward();
        return;
      }

      if (response.error.code == '23505') {
        toast.error(t('UserProfile.DuplicateUserNameErrorMessage'));
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-10 flex-column-between flex-centered full-height">
      <div className="col-10">
        <h1>{CarrouselData.PageTwo.title}</h1>
        <p>{CarrouselData.PageTwo.content}</p>
        <TextInput
          error={errors.username}
          className="bg-white"
          iconLeft={<Icon name="person" />}
          placeholder="Enter your username"
          {...register('username', FormRules.username)}
        />
      </div>

      <img src={Emilio} className={style.emilio} />

      <div className="col-6">
        <Button className="btn-lg" disabled={isSubmitting}>
          {CarrouselData.PageTwo.buttonOneText}
        </Button>
      </div>
    </form>
  );
};
