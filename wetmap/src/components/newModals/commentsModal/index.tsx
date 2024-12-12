import React, { useState, useContext, useEffect } from 'react';
import CommentListItem from '../../commentListItem/commentListItem';
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
  const [replyTo, setReplyTo] = useState<(string|number)[]| null>(null);
  const [selectedReplyId, setSelectedReplyId] = useState<number[]>([]);

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
      setCommentContent('')
      setReplyTo(null);
      getAllPictureComments(selectedPicture?.id);
    };
  };

  const getAllPictureComments = async (picId: number | undefined) => {
    let picComments = await grabPhotoCommentsByPicId(picId);
    setListOfComments(picComments);
  };


  const hideRepliesForChildren = (parentId: number, newSelectedReplyId: number[]) => {
    newSelectedReplyId = [
      ...newSelectedReplyId.filter(id => parentId !== id),
    ];
    for (const comment of listOfComments) {
      if (comment.replied_to === parentId) {
        newSelectedReplyId = hideRepliesForChildren(
          comment.id,
          newSelectedReplyId,
        );
      }
    }

    return newSelectedReplyId;
  };

  const toggleShowReplies = (commentID: number) => {
    if (selectedReplyId.includes(commentID)) {
      let selectedReplyIdTemp = hideRepliesForChildren(
        commentID,
        selectedReplyId,
      );
      setSelectedReplyId(selectedReplyIdTemp);
    } else {
      setSelectedReplyId([...selectedReplyId, commentID]);
    }
  };

  const getCommentListView = (commentId: number | null, level = 0) => {
    let marginLeft = 5 * level;
    let width = 100 - marginLeft;
    const marginStyle = {
      commentLevelShift: {
        marginLeft: `${marginLeft}%`,
        width:      `${width}%`,
      },
    };
    return (
      <div
        key={`parent-${commentId ? commentId : 0}`}
        className="commentListContainer"
        style={marginStyle.commentLevelShift}
      >
        {listOfComments
        && listOfComments.map((commentDeets) => {
          if (commentDeets.replied_to === commentId) {
            let nbReplies = 0;
            for (let comment of listOfComments) {
              if (comment.replied_to === commentDeets.id) {
                nbReplies++;
              }
            }
            return selectedReplyId.includes(commentDeets.replied_to)
              || commentDeets.replied_to === null
              ? (
                  <div key={commentDeets.id}>
                    <CommentListItem
                      commentDetails={commentDeets}
                      setReplyTo={setReplyTo}
                      replyTo={replyTo}
                      toggleShowReplies={() => toggleShowReplies(commentDeets.id)}
                      selectedReplyId={selectedReplyId}
                      nbReplies={nbReplies}
                    />
                    {getCommentListView(commentDeets.id, level + 1)}
                  </div>
                )
              : null;
          }
        })}
      </div>
    );
  };

  return (
    <CommentsModalView 
    handleCommentInsert={handleCommentInsert}
    setCommentContent={setCommentContent}
    setReplyTo={setReplyTo}
    commentContent={commentContent}
    replyTo={replyTo}
    getCommentListView={getCommentListView}
    onClose={props.onModalCancel}
    />
   
  );
};

export default CommentsModal;
