import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { SelectedPictureContext } from '../../contexts/selectedPictureContext';
import {
  insertPhotoComment,
  grabPhotoCommentsByPicId,
} from '../../../supabaseCalls/photoCommentSupabaseCalls';
import { ModalHandleProps } from '../../reusables/modal/types';
import CommentsModalView from './view';
import { CommentItem } from '../../../entities/comment';

type CommentModalProps = Partial<ModalHandleProps>;

const CommentsModal = (props: CommentModalProps) => {
  const { profile } = useContext(UserProfileContext);
  const { selectedPicture } = useContext(SelectedPictureContext);
  const [commentContent, setCommentContent] = useState<string>('');
  const [listOfComments, setListOfComments] = useState<CommentItem[]>([]);
  const [replyTo, setReplyTo] = useState<(string | number)[] | null>(null);

  useEffect(() => {
    if (selectedPicture) {
      getAllPictureComments(selectedPicture.id);
    }
    setCommentContent('');
  }, []);

  const handleCommentInsert = async () => {
    let userIdentity = null;
    if (replyTo) {
      userIdentity = replyTo[1];
    }
    if (commentContent === null || commentContent === '') {
      return;
    } else {
      let finalContent;
      if (replyTo) {
        finalContent = '@' + replyTo[0] + ' - ' + commentContent;
      } else {
        finalContent = commentContent;
      }
      await insertPhotoComment(
        profile?.UserID,
        selectedPicture?.id,
        finalContent,
        userIdentity,
      );
      setCommentContent('');
      setReplyTo(null);
      getAllPictureComments(selectedPicture?.id);
    };
  };

  const getAllPictureComments = async (picId: number | undefined) => {
    const picComments = await grabPhotoCommentsByPicId(picId);
    setListOfComments(picComments);
  };

  return (
    <CommentsModalView
      handleCommentInsert={handleCommentInsert}
      setCommentContent={setCommentContent}
      setReplyTo={setReplyTo}
      replyTo={replyTo}
      listOfComments={listOfComments}
      onClose={props.onModalCancel}
    />
  );
};

export default CommentsModal;
