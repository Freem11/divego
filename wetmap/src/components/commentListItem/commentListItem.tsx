import React, { SetStateAction } from 'react';
import style from './style.module.scss';
import { CommentItem } from '../../entities/comment';
import { useTranslation } from 'react-i18next';

type CommentListItemType = {
  commentDetails:    CommentItem
  setReplyTo:        (value: SetStateAction<(string | number)[] | null>) => void
  replyTo:           (string | number)[] | null
  toggleShowReplies: (commentID: CommentItem) => void
  selectedReplyId:   number[]
  nbReplies:         number
};

export default function CommentListItem(props: CommentListItemType) {
  const {
    commentDetails,
    setReplyTo,
    replyTo,
    toggleShowReplies,
    selectedReplyId,
    nbReplies,
  } = props;

  const { t } = useTranslation();

  const newDate = new Date(commentDetails.created_at);
  const finalDate = newDate.toLocaleString().substring(0, 10);

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
          {t('CommentsModal.replyButton')}
        </p>
        {nbReplies > 0
          ? (
              <p
                className={style.viewRepliesText}
                onClick={() => toggleShowReplies(commentDetails)}
              >
                {selectedReplyId.includes(commentDetails.id)
                  ?  nbReplies === 1 ? t('CommentsModal.replyHideSingle') : t('CommentsModal.replyHideMultiple')
                  : nbReplies === 1 ? t('CommentsModal.replyViewSingle') : `${t('CommentsModal.replyViewMultiplOne')} ${nbReplies} ${t('CommentsModal.replyViewMultiplTwo')}`}
              </p>
            )
          : (
              ''
            )}
      </div>

    </div>
  );
}
