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
import { ModalContext } from '../contexts/modalContext';
import CommentsModal from './commentsModal';
import FullScreenModal from './fullScreenModal';
import { ModalWindowSize } from '../reusables/modal/constants';
import DiveSiteImageView from './view';

export default function DiveSiteImage(props) {
  return (
    <DiveSiteImageView></DiveSiteImageView>
  );
}
