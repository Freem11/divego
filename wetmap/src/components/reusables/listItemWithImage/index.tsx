import React  from 'react';
import './style.scss';
import BlurryImage from '../blurryImage';

type ListItemWithImageProps = {
  imageUrl:     string | null
  imageAlt?:    string
  title:        string
  date:         string
  highlighted?: boolean
};

export default function ListItemWithImage(props: ListItemWithImageProps) {
  return (
    <div className={`ssrc-list-item-with-image ${props.highlighted ? 'highlighted' : ''}`}>
      <div className="ssrc-list-item-with-image__container">
        <BlurryImage src={props.imageUrl} alt={props.imageAlt} />
        <div className="">
          <div className="">
            <h6 className="">{props.title}</h6>
            <span className="">{props.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
