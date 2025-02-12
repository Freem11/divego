import React  from 'react';
import styles from './style.module.scss';
import backgroundPhoto from '../../../images/blackManta.png';
import Icon from '../../../icons/Icon';

type ListItemWithImageProps = {
  imageUrl:     string | null
  imageAlt?:    string
  title:        string
  info?:        string
  rating?:      number
  highlighted?: boolean
};

export default function SidebarCard({ imageUrl, imageAlt, title, info, rating, highlighted }: ListItemWithImageProps) {
  return (
    <div className={`${styles.card} ${highlighted && styles.highlighted}`}>
      <div className={styles.overlay}></div>
      <img src={imageUrl || backgroundPhoto} alt={imageAlt} className={styles.backgroundImage} />
      <p className={styles.title}>{title}</p>

      <div className={styles.info}>
        {rating && (
          <>
            <div className={styles.rating}>
              <Icon name="star" />
              <span>{rating}</span>
            </div>
            •
          </>
        )}
        {info && <span>{info}</span>}
      </div>
    </div>
  );
}
