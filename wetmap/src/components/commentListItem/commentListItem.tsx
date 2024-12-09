import React from 'react';
import style from './style.module.scss';

export default function CommentListItem(props) {
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
        <p>{commentDetails.content}</p>
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
          Reply
        </p>
        {nbReplies > 0
        ? (
            <p
              className={style.viewRepliesText}
              onClick={() => toggleShowReplies(commentDetails)}
            >
              {selectedReplyId.includes(commentDetails.id)
                ? `Hide replies`
                : nbReplies === 1 ? `View Reply` : `View ${nbReplies} Replies`}
            </p>
          )
        : (
            ''
          )}
      </div>

    </div>
  );
}
