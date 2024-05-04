import React from "react";
import "./commentListItem.css";

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
    <div>
      <div className="container" key={commentDetails.id}>
        <div className="topBox">
          <p className="userTxt">{commentDetails.username}</p>
          <p className="dateTxt">{finalDate}</p>
        </div>

        <p className="contentTxt">{commentDetails.content}</p>
      </div>
      <p
        className="replyTxt"
        onClick={() => {
          replyTo && replyTo[0] === commentDetails.username
            ? setReplyTo(null)
            : setReplyTo([commentDetails.username, commentDetails.id]);
        }}
      >
        Reply
      </p>
      {nbReplies > 0 ? (
        <p
          className="replyTxt"
          onClick={() => toggleShowReplies(commentDetails)}
        >
          {selectedReplyId.includes(commentDetails.id)
            ? `Hide replies`
            : `View ${nbReplies} Replies`}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

