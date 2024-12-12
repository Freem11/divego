import React, { useState, useContext } from 'react';
import { UserProfileContext } from '../contexts/userProfileContext';
import { SelectedPictureContext } from '../contexts/selectedPictureContext';
import {
  insertPhotoLike,
  deletePhotoLike,
} from '../../supabaseCalls/photoLikeSupabaseCalls';
import { grabProfileByUserName } from '../../supabaseCalls/accountSupabaseCalls';
import FlagIcon from '@mui/icons-material/Flag';
import notLiked from '../../images/Hand-Hollow-Blue.png';
import liked from '../../images/Hand-Filled-Blue.png';
import style from './picture.module.scss';
import UserProfileModal from './userProfileModal';
import { ModalContext } from '../reusables/modal/context';
import CommentsModal from './commentsModal';
import FullScreenModal from './fullScreenModal';

function Picture(props) {
  const { pic } = props;
  const { profile } = useContext(UserProfileContext);
  const [picLiked, setPicLiked] = useState(pic.likedbyuser);
  const [likeData, setLikeData] = useState(pic.likeid);
  const [countOfLikes, setCountOfLikes] = useState(pic.likecount);
  const { setSelectedPicture } = useContext(SelectedPictureContext);

  const { modalShow } = useContext(ModalContext);

  let photoName = pic.photoFile.split('/').pop();

  const handleFollow = async (e, userName) => {
    e.stopPropagation();

    let picOwnerAccount = await grabProfileByUserName(userName);

    if (profile[0].UserID === picOwnerAccount[0].UserID) {
      return;
    }

    modalShow(UserProfileModal, {
      keepPreviousModal: true,
      selectedProfile:   picOwnerAccount[0].UserID,
    });
  };

  const handleCommentModal = () => {
    modalShow(CommentsModal, {
      keepPreviousModal: true,
    });
    setSelectedPicture(pic);
  };

  const handleLike = async (e) => {
    e.stopPropagation();

    if (picLiked) {
      deletePhotoLike(likeData);
      setPicLiked(false);
      setCountOfLikes(countOfLikes - 1);
    } else {
      const newRecord = await insertPhotoLike(profile[0].UserID, pic.id);
      setPicLiked(true);
      setLikeData(newRecord[0].id);
      setCountOfLikes(countOfLikes + 1);
    }
  };

  const handleModalOpen = () => {
    modalShow(FullScreenModal, {
      keepPreviousModal: true,
      size:              'full',
      src:               `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`,
    });
  };

  return (
    <div key={pic.id}>
      {/* <h1>test</h1> */}
      <div className={style.helper} style={{ marginBottom: '-8%' }}>
        <h4 className={style.animalLabelP}>{pic.label}</h4>
        {/* this component is the name of the label */}
        <a
          className={style.atagp}
          href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${pic.label}"%20${pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
        >
          <FlagIcon sx={{ color: 'red' }} />
        </a>
      </div>
      <img
        src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
        style={{ width: '100%', borderRadius: '3%' }}
        onClick={() => handleModalOpen()}
      >
      </img>

      <div className={style.helper2} style={{ marginTop: '-8%' }}>
        <h4
          className={style.userLabel}
          onClick={e => handleFollow(e, pic.newusername)}
        >
          Added by:
          {' '}
          {pic.UserName}
        </h4>

        <div className={style.helper3}>
          {countOfLikes > 0
            ? (
                <div className={style.countIndicator}>
                  <p className="countDisplay">{countOfLikes}</p>
                </div>
              )
            : <div style={{ width: '40px',  marginRight: '-10%' }}></div>}
          <img
            src={picLiked ? liked : notLiked}
            className={style.likeIcon}
            onClick={e => handleLike(e, pic.id)}
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
        <p className={style.commentPrompt} onClick={() => handleCommentModal(pic)}>
          {pic.commentcount < 1
            ? 'Be first to Comment'
            : `Comment / View all ${pic.commentcount} Comments`}
          {' '}
        </p>
      </div>
    </div>
  );
}

export default Picture;
