import React  from 'react';

import style from './style.module.scss';

type DiveShopItemProps = {
  imageUrl: string | null
  title:    string
  date:     string
};

export default function DiveSiteItemView(props: DiveShopItemProps) {
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
