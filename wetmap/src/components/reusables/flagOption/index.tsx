import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../buttonIcon';
import Icon from '../../../icons/Icon';
import React from 'react';

type FlagOptionProps = {
  title:             string
  index:             number
  selectedReason:    number | null
  setSelectedReason: (reason: number) => void
};

export default function FlagOption(props: FlagOptionProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (props.selectedReason !== props.index) {
      releaseMoreInfoAnimations();
    }
  }, [props.selectedReason]);

  const startMoreInfoAnimation = (id: number) => {
    props.setSelectedReason(id);

    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const releaseMoreInfoAnimations = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.grayOutline}>
      <h5 className="ml-8 mb-0 text-bold text-dark">{props.title}</h5>
      <ButtonIcon
        icon={<Icon name="chevron-right" />}
        className={`btn text-gray ml-4 my-2 ${styles.buttonBack} ${
          isActive ? styles.active : styles.inactive
        }`}
        onClick={() => startMoreInfoAnimation(props.index)}
      />
    </div>
  );
}
