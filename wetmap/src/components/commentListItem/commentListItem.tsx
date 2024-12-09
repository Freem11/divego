import React, { useState, useContext, useEffect } from 'react';
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
    </div>
  );
}
