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
import { ModalContext } from '../../reusables/modal/context';
import CommentsModal from '../../modals/commentsModal';
import FullScreenModal from '../../modals/fullScreenModal';
// import ModalWindow, { ModalWindowSize } from '../../reusables/modal/types';
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
  // console.log(pic);

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
      size:              'full',
      src:               `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`,
    });
    // can I get the image size from the modal instead of hard coding it?
  };

  // console.log({handleModalOpen});
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
