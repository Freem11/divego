import React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useRef } from "react";
import { animated, useSpring } from 'react-spring';

import ConfirmationModal from '../../modals/confirmationModal';
import '../../modals/confirmationModal.css'; 
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import { Form, FormRules } from './form';
import style from "./style.module.scss";



type SiteSubmitterProps = {
  values?:  Form
  onClose: () => void
  getDeviceLocation: () => void
  onNavigate: () => void
  sucessModalSlide: { transform: SpringValue<string>; }
  animateSuccessModal: () => void
  //cautionModalSlide: { transform: SpringValue<string>; }
  animateCautionModal: () => void
  successModalRef: React.MutableRefObject<null> | null
  cautionModalRef: React.MutableRefObject<null> | null
  successModalYCoord: number | null
  cautionModalYCoord: number | null
  
  
};

export default function SiteSubmitterView(props: SiteSubmitterProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    values:   props.values,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    console.log("Form data:", data);
  
    setIsModalOpen(true); // Open modal
  };


  /*
  const successModalRef = useRef(null);
  const cautionModalRef = useRef(null);

  const sucessModalSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${props.successModalYCoord}px,0)` },
  });

  const cautionModalSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${props.cautionModalYCoord}px,0)` },
  });
  */
 

  return (
    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic}  onClose={props.onClose} />

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="d-flex">
            <h1 className="text-clip">{screenData.PicUploader.header}</h1>
          </div>

          <div className="stack-4 mb-2">
            <TextInput
              iconLeft={<Icon name="diving-scuba-flag" />}
              placeholder={screenData.DiveSiteAdd.siteNamePlaceholder}
              error={errors.Site}
              {...register('Site', FormRules.Site)}
            />

            <TextInput
              iconLeft={<Icon name="latitude" />}
              placeholder={screenData.DiveSiteAdd.latPlaceholder}
              error={errors.Latitude}
              {...register('Latitude', FormRules.Latitude)}
            />

            <TextInput
              iconLeft={<Icon name="longitude" />}
              placeholder={screenData.DiveSiteAdd.lngPlaceholder}
              error={errors.Longitude}
              {...register('Longitude', FormRules.Longitude)}
            />
          </div>
        </div>
  

        <div className={style.horizontalButtonContainer}>
          
          <div className = 'col-3'>
            <Button
              onClick={props.getDeviceLocation}
              className="btn-md"
              type="button"
            >
              <text>{screenData.DiveSiteAdd.myLocationButton}</text>
            </Button>
          </div>

          <div className = "col-3 ">
            <Button
              onClick={props.onNavigate}
              className={'btn-md'}
              type="button"
            >
              {screenData.DiveSiteAdd.pinButton}
            </Button>
          </div>
        </div>
      
        <div className={style.horizontalButtonContainer}>
          <div className= 'col-3' ></div>

          <div className='col-3'>
            <Button
              className="btn-md bg-primary"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.DiveSiteAdd.submitButton}
            </Button>
          </div>
        </div>
      </form>
    
        {/*}
        <animated.div
          className="successModal modalBase"
          //style={props.sucessModalSlide}
          //ref={props.successModalRef}
        > */}
    {isModalOpen && (
        <ConfirmationModal
          submissionItem="dive site"
          animateModal={props.animateSuccessModal}
          handleClose={props.onClose}
          isSuccess={false}
        /> )}
        {/*
      </animated.div>

      <animated.div
        className="cautionModal modalBase"
        style={props.cautionModalSlide}
        ref={props.cautionModalRef}
      > 
      <div>
        <ConfirmationModal
          submissionItem="dive site"
          animateModal={props.animateCautionModal}
          isSuccess={false}
        />
      </div>
      </div></animated.div>
      */}

    </div>
  );
}
