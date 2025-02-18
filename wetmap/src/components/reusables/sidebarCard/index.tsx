import React  from 'react';
import styles from './style.module.scss';
import backgroundPhoto from '../../../images/blackManta.png';
import Icon from '../../../icons/Icon';
import BlurryImage from '../blurryImage';

type SidebarCardProps = {
  imageUrl:     string | null
  imageAlt?:    string
  title:        string
  info?:        string
  rating?:      number
  hoverHide?:   boolean
  highlighted?: boolean
};

export default function SidebarCard(props: SidebarCardProps) {
  return (
    <div className={`${styles.card} ${props.highlighted && styles.highlighted}`}>
      <div className={`${styles.overlay} ${props.hoverHide && styles.hoverHide}`}></div>
      <BlurryImage src={props.imageUrl || backgroundPhoto} alt={props.imageAlt} className={styles.backgroundImage} />
      <div className={`${styles.content} ${props.hoverHide && styles.hoverHide}`}>
        <p className={styles.title}>{props.title}</p>

        <div className={styles.info}>
          {props.rating && (
            <>
              <div className={styles.rating}>
                <Icon name="star" />
                <span>{props.rating}</span>
              </div>
              •
            </>
          )}
          {props.info && <span>{props.info}</span>}
        </div>
      </div>
    </div>
  );
}
