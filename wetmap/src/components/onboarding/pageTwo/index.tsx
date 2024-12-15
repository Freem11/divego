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

export default function PageTwo() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();
  const { slideForward } = useContext(SliderContext);
  const onSubmit = (data: Form) => {
    slideForward();
    console.log(data);
  };

  return (

    <div className={style.pageContainer}>

        <div className={style.topContainer}>
          <div className={style.titleContainer}>
            <h1 style={{color: 'white'}}>{CarrouselData.PageTwo.title}</h1>
          </div>

          <div className={style.contentContainer}>
          <p style={{color: 'white'}}>{CarrouselData.PageTwo.content}</p>
          </div>
        </div>

        <form  style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputContainer}>
            <TextInput
              error={errors.username}
              iconLeft={<Icon name="person" />}
              placeholder="Enter your username"
              {...register('username', FormRules.username)}
            />
          </div>
          <div className={style.buttonContainerAlt}>
            <Button
              disabled={isSubmitting}
              className="btn-lg"
              type="submit"
            >
              {CarrouselData.PageTwo.buttonOneText}
            </Button>
          </div>
        </form>

        <img src={Emilio} height='400vh' className={style.emilio}/>

    </div>


  );
};
