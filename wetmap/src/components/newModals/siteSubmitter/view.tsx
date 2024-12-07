import React from 'react';
import { useForm } from 'react-hook-form';
import { animated, useSpring } from 'react-spring';

import ConfirmationModal from './../../confirmationModal';
import backGroundPic from '../../../images/boat.png';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import { Form, FormRules } from './form';
import style from "./style.module.scss";



type SiteSubmitterProps = {
  onSubmit: (data: any) => void
  values?:  Form
  onClose: () => void
  getDeviceLocation: () => void
  onNavigate: () => void
  sucessModalSlide: () => void
  animateSuccessModal: () => void
  cautionModalSlide: () => void
  animateCautionModal: () => void
  successModalRef: () => void
  cautionModalRef: () => void
};

export default function SiteSubmitterView(props: SiteSubmitterProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
    values:   props.values,
  });

  return (
    <div className="flex-column-between full-height">
      <WavyModalHeader image={backGroundPic}  onClose={props.onClose} />

      <form className="flex-column-between full-height mx-6 mb-6" onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <div className="d-flex">
            <h1 className="text-clip">{screenData.PicUploader.header}</h1>
          </div>

          <div className="stack-4 mb-2">
            <TextInput
              iconLeft={<Icon name="diving-scuba-flag" />}
              placeholder={screenData.DiveSiteAdd.siteNamePlaceholder}
              error={errors.Site}
              {...register('Site', FormRules.name)}
            />

            <TextInput
              iconLeft={<Icon name="latitude" />}
              placeholder={screenData.DiveSiteAdd.latPlaceholder}
              {...register('Latitude')}
            />

            <TextInput
              iconLeft={<Icon name="longitude" />}
              placeholder={screenData.DiveSiteAdd.lngPlaceholder}
              {...register('Longitude')}
            />
          </div>
        </div>
  

        <div className={style.horizontalButtonContainer}>
          
          <div className = 'col-3'>
            <Button
              onClick={props.getDeviceLocation}
              disabled={isSubmitting}
              className="btn-md"
              type="submit"
            >
              <text>{screenData.DiveSiteAdd.myLocationButton}</text>
            </Button>
          </div>

          <div className = "col-3 ">
            <Button
              onClick={props.onNavigate}
              disabled={isSubmitting}
              className={'btn-md'}
              type="submit"
            >
              {screenData.DiveSiteAdd.pinButton}
            </Button>
          </div>
        </div>
      
        <div className={style.horizontalButtonContainer}>
          <div className= 'col-3' ></div>

          <div className='col-3'>
            <Button
              disabled={isSubmitting}
              className="btn-md bg-primary"
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.DiveSiteAdd.submitButton}
            </Button>
          </div>
        </div>
      </form>

      <animated.div
        className="successModal modalBase"
        style={props.sucessModalSlide}
        ref={props.successModalRef}
      >
        <ConfirmationModal
          submissionItem="dive site"
          animateModal={props.animateSuccessModal}
          handleClose={props.onClose}
          isSuccess={true}
        />
      </animated.div>

      <animated.div
        className="cautionModal modalBase"
        style={props.cautionModalSlide}
        ref={props.cautionModalRef}
      >
        <ConfirmationModal
          submissionItem="dive site"
          animateModal={props.animateCautionModal}
          isSuccess={false}
        />
      </animated.div>
    </div>
  );
}
