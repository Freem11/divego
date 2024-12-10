import React, { SetStateAction } from 'react';
import style from './style.module.scss';
import screenData from '../newModals/screenData.json';
import { CommentItem } from '../../entities/comment';

type CommentistItemType = {
  commentDetails: CommentItem
  setReplyTo: (value: SetStateAction<(string|number)[] | null>) => void
  replyTo: (string|number)[] | null
  toggleShowReplies: (commentID: CommentItem) => void
  selectedReplyId: number[]
  nbReplies: number
}

export default function CommentListItem(props: CommentistItemType) {
  const {
    commentDetails,
    setReplyTo,
    replyTo,
    toggleShowReplies,
    selectedReplyId,
    nbReplies,
  } = props;

  let newDate = new Date(commentDetails.created_at);
  let finalDate = newDate.toLocaleString().substring(0, 10);

  return (
    <div className={style.masterBox} key={commentDetails.id}>
      <div className={style.shadowbox}>
      <div className={style.topBox}>
          <p className={style.userText}>{commentDetails.username}</p>
          <p className={style.dateText}>{finalDate}</p>
        </div>
        <p className={style.commentText}>{commentDetails.content}</p>
      </div>

      <div className={style.replyBox}>
        <p
          className={style.replyText}
          onClick={() => {
            replyTo && replyTo[0] === commentDetails.username
              ? setReplyTo(null)
              : setReplyTo([commentDetails.username, commentDetails.id]);
          }}
        >
          {screenData.CommentsModal.replyButton}
        </p>
        {nbReplies > 0
        ? (
            <p
              className={style.viewRepliesText}
              onClick={() => toggleShowReplies(commentDetails)}
            >
              {selectedReplyId.includes(commentDetails.id)
                ?  screenData.CommentsModal.replyHide
                : nbReplies === 1 ? screenData.CommentsModal.replyViewSingle : `${screenData.CommentsModal.replyViewMultiplOne} ${nbReplies} ${screenData.CommentsModal.replyViewMultiplTwo}`}
            </p>
          )
        : (
            ''
          )}
      </div>

    </div>
  );
}
