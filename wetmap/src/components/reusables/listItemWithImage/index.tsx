import React  from 'react';
import './style.scss';

type ListItemWithImageProps = {
  imageUrl:     string | null
  title:        string
  date:         string
  highlighted?: boolean
};

export default function ListItemWithImage(props: ListItemWithImageProps) {
  return (
    <div className={`ssrc-list-item-with-image ${props.highlighted ? 'highlighted' : ''}`}>
      <div className="ssrc-list-item-with-image__container">

        <img src={props.imageUrl} className="" alt="" />

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
