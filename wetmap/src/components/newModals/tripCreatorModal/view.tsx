import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import { Form, FormRules } from './form';
import { useForm } from 'react-hook-form';
import Button from '../../reusables/button';
import Label from '../../reusables/label';
import SiteSelector from '../../reusables/siteSelector';
import { ItineraryItem } from '../../../entities/itineraryItem';


type TripCreatorViewProps = {
  onClose?:         () => void
  itineraryList:    ItineraryItem[] | null
  headerPictureUrl: string | null
};

export default function TripCreatorView(props: TripCreatorViewProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  return (
    <div className="cols mx-0 full-height">
      <div className="col-12 panel border-none full-height">
        {/* <div className={style.buttonBack}> */}
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className={`btn-lg ${styles.buttonBack}`}
          onClick={props.onClose}
        />
        <div className={styles.header}>
          <h3>Trip Creator</h3>
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>

  );
}
