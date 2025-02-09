import React  from 'react';
import './style.scss';

type ListItemWithImageProps = {
  id:           number
  imageUrl:     string | null
  imageAlt?:    string
  title:        string
  date:         string
  highlighted?: boolean
  onClick:      (id: number) => void
};

export default function ListItemWithImage(props: ListItemWithImageProps) {
  return (
    <div onClick={() => props.onClick(props.id)} className={`ssrc-list-item-with-image ${props.highlighted ? 'highlighted' : ''}`}>
      <div className="ssrc-list-item-with-image__container">

        <img src={props.imageUrl || ''} alt={props.imageAlt} />

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
