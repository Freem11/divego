import React  from 'react';
import styles from './style.module.scss';
import backgroundPhoto from '../../../images/blackManta.png';
import Icon from '../../../icons/Icon';
import BlurryImage from '../blurryImage';

type SidebarCardProps = {
  imageUrl:      string | null
  imageAlt?:     string
  title:         string
  info?:         string
  rating?:       number
  hoverHide?:    boolean
  highlighted?:  boolean
  extraContent?: React.ReactNode
};

export default function SidebarCard(props: SidebarCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <BlurryImage src={props.imageUrl || backgroundPhoto} alt={props.imageAlt} className={styles.cardImage} />
        <div className={styles.bookmarkWrapper}>
          <Icon name="flag" className={styles.bookmarkIcon} style={{ scale: '1.2' }} />
        </div>
      </div>
      
      <div className={styles.textWrapper}>
        <p className={styles.cardTitle}>{props.title}</p>
        <div className={styles.extraContent}>{props.extraContent}</div>
        
        {(props.rating || props.info) && (
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
        )}
      </div>
    </div>
  );
}
