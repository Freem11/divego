import React  from 'react';

import style from './style.module.scss';

type PhotoItemViewProps = {
  imageUrl: string
  title:    string
  date:     string
};

export default function PhotoItemView(props: PhotoItemViewProps) {
  return (
    <div className={style.photoItemContainer}>
      <div className="d-flex">
        <div className="">
          <img src={props.imageUrl} className="" alt="" />
        </div>
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
