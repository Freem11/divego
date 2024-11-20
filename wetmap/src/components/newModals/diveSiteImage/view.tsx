import React from 'react';
import style from './style.module.scss';
import FlagIcon from '@mui/icons-material/Flag';
import notLiked from '../../../images/Hand-Hollow-Blue.png';
import liked from '../../../images/Hand-Filled-Blue.png';


type DiveSiteImageViewProps = {
  pic:                any
  handleModalOpen:    any
  handleLike:         any
  handleFollow:       any
  handleCommentModal: any
  countOfLikes:       any
  picLiked:           any
};
// have to change type declarations asap

export default function DiveSiteImageView(props: DiveSiteImageViewProps) {
  let photoName = props.pic.photoFile.split('/').pop();
  return (
    // <h1>test2</h1>
    <div key={props.pic.id} style={{position: 'relative'}}>
      {/* <h1>test</h1> */}
      <div className={style.helper} style={{ position: 'absolute', top: 10}}>
        <h4 className={style.animalLabelP}>{props.pic.label}</h4>
        {/* this component is the name of the label */}
        <a
          className={style.atagp}
          href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${props.pic.label}"%20${props.pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
        >
          <FlagIcon sx={{ color: 'red' }} />
        </a>
      </div>
      {/* <div className={style.wavyModalHeader} style={{ backgroundImage: `url(https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName})`, backgroundSize: 'contain', width: '100%', height: 200, backgroundRepeat: 'no-repeat'}}></div> */}
      <img
        src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
        style={{ width: '100%', borderRadius: '3%' }}
        onClick={() => props.handleModalOpen()}
      >
      </img>

      <div className={style.helper2} style={{ marginTop: '-10%' }}>
        <h4
          className={style.userLabel}
          onClick={e => props.handleFollow(e, props.pic.newusername)}
        >
          Added by:
          {' '}
          {props.pic.UserName}
        </h4>

        <div className={style.helper3}>
          {props.countOfLikes > 0
            ? (
                <div className={style.countIndicator}>
                  <p className="countDisplay">{props.countOfLikes}</p>
                </div>
              )
            : <div style={{ width: '40px',  marginRight: '-10%' }}></div>}
          <img
            src={props.picLiked ? liked : notLiked}
            className={style.likeIcon}
            onClick={e => props.handleLike(e, props.pic.id)}
            style={{
              height: 30,
              width:  30,
            }}
          />
        </div>
      </div>
      {/* </div> */}

      <div
        style={{
          display:       'flex',
          flexDirection: 'row',
          marginLeft:    20,
          zIndex:        4,
        }}
      >
        <p className={style.commentPrompt} onClick={() => props.handleCommentModal(props.pic)}>
          {props.pic.commentcount < 1
            ? 'Be first to Comment'
            : `Comment / View all ${props.pic.commentcount} Comments`}
          {' '}
        </p>
      </div>
    </div>
  );
}
