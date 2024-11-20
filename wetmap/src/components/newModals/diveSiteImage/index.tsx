import React, { useState, useContext } from 'react';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SelectedPictureContext } from '../../contexts/selectedPictureContext';
import {
  insertPhotoLike,
  deletePhotoLike,
} from '../../../supabaseCalls/photoLikeSupabaseCalls';
import { grabProfileByUserName } from '../../../supabaseCalls/accountSupabaseCalls';
// import style from './picture.module.scss';
import UserProfileModal from '../../modals/userProfileModal';
import { ModalContext } from '../../contexts/modalContext';
import CommentsModal from '../../modals/commentsModal';
import FullScreenModal from '../../modals/fullScreenModal';
import { ModalWindowSize } from '../../reusables/modal/constants';
import DiveSiteImageView from './view';

export default function DiveSiteImage(props) {
  const { pic } = props;
  const { profile } = useContext(UserProfileContext);
  const [picLiked, setPicLiked] = useState(pic.likedbyuser);
  const [likeData, setLikeData] = useState(pic.likeid);
  const [countOfLikes, setCountOfLikes] = useState(pic.likecount);
  const { setSelectedPicture } = useContext(SelectedPictureContext);

  const { modalShow } = useContext(ModalContext);

  const photoName = pic.photoFile.split('/').pop();

  const handleFollow = async (e, userName) => {
    e.stopPropagation();

    const picOwnerAccount = await grabProfileByUserName(userName);

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
      size:              ModalWindowSize.FULL,
      src:               `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`,
    });
    // const imgTest = new Image();
    // imgTest.src = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`;
    // console.log(`Width: ${imgTest.width}px, Height: ${imgTest.height}px`);
  };

  return (
    <DiveSiteImageView
      pic={pic}
      handleModalOpen={handleModalOpen}
      handleLike={handleLike}
      handleCommentModal={handleCommentModal}
      handleFollow={handleFollow}
      countOfLikes={countOfLikes}
      picLiked={picLiked}
    />
  );
}
