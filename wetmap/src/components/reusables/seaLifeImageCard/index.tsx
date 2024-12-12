import React, { useState, useContext } from 'react';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SelectedPictureContext } from '../../contexts/selectedPictureContext';
import {
  insertPhotoLike,
  deletePhotoLike,
} from '../../../supabaseCalls/photoLikeSupabaseCalls';
import { grabProfileByUserName } from '../../../supabaseCalls/accountSupabaseCalls';
import UserProfileModal from '../../modals/userProfileModal';
import { ModalContext } from '../../reusables/modal/context';
import CommentsModal from '../../modals/commentsModal';
import FullScreenModal from '../../modals/fullScreenModal';
import SeaLifeImageCardView from './view';
import { PhotoWithLikesAndComments } from '../../../entities/photos';

export default function SeaLifeImageCard(props: { pic: PhotoWithLikesAndComments }) {
  const { pic } = props;
  const { profile } = useContext(UserProfileContext);
  const [picLiked, setPicLiked] = useState(pic.likedbyuser);
  const [likeData, setLikeData] = useState(pic.likeid);
  const [countOfLikes, setCountOfLikes] = useState(pic.likecount);
  const { setSelectedPicture } = useContext(SelectedPictureContext);

  const { modalShow } = useContext(ModalContext);
  const photoName = pic.photoFile.split('/').pop();


  const handleFollow = async (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, userName: string) => {
    e.stopPropagation();
    let picOwnerAccount;
    const accounts = await grabProfileByUserName(userName);
    if (accounts) {
      picOwnerAccount = accounts[0];

      if (profile?.UserID === picOwnerAccount.UserID) {
        return;
      }
    }

    modalShow(UserProfileModal, {
      keepPreviousModal: true,
      selectedProfile:   picOwnerAccount && picOwnerAccount.UserID,
    });
  };

  const handleCommentModal = () => {
    modalShow(CommentsModal, {
      keepPreviousModal: true,
    });
    setSelectedPicture(pic);
  };

  const handleLike = async (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.stopPropagation();
    if (picLiked) {
      deletePhotoLike(likeData);
      setPicLiked(false);
      setCountOfLikes(countOfLikes - 1);
    } else {
      if (profile) {
        const newRecord = await insertPhotoLike(profile?.UserID, pic.id);
        setPicLiked(true);
        setLikeData(newRecord && newRecord[0].id);
        setCountOfLikes(countOfLikes + 1);
      }
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
    <SeaLifeImageCardView
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
