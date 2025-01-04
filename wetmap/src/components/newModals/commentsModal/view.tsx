import React, { SetStateAction, useState } from 'react';
import screenData from '../screenData.json';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import CommentListItem from '../../commentListItem/commentListItem';
import { CommentItem } from '../../../entities/comment';
import TextAreaInput from '../../reusables/textAreaInput';

type CommentsModalViewProps = {
  handleCommentInsert: () => void
  setCommentContent:   (value: SetStateAction<string>) => void
  setReplyTo:          (value: SetStateAction<(number | string)[] | null>) => void
  replyTo:             (number | string)[] | null
  listOfComments:      CommentItem[]
  onClose?:            () => void
};

export default function CommentsModalView(props: CommentsModalViewProps) {
  const [selectedReplyId, setSelectedReplyId] = useState<number[]>([]);

  const hideRepliesForChildren = (parentId: number, newSelectedReplyId: number[]) => {
    newSelectedReplyId = [
      ...newSelectedReplyId.filter(id => parentId !== id),
    ];
    for (const comment of props.listOfComments) {
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
      const selectedReplyIdTemp = hideRepliesForChildren(
        commentID,
        selectedReplyId,
      );
      setSelectedReplyId(selectedReplyIdTemp);
    } else {
      setSelectedReplyId([...selectedReplyId, commentID]);
    }
  };

  const getCommentListView = (commentId: number | null, level = 0) => {
    const marginLeft = 5 * level;
    const width = 100 - marginLeft;
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
        {props.listOfComments
        && props.listOfComments.map((commentDeets) => {
          if (commentDeets.replied_to === commentId) {
            let nbReplies = 0;
            for (const comment of props.listOfComments) {
              if (comment.replied_to === commentDeets.id) {
                nbReplies++;
              }
            }
            return commentDeets.replied_to === null || 
            selectedReplyId.includes(commentDeets.replied_to)
              ? (
                  <div key={commentDeets.id}>
                    <CommentListItem
                      commentDetails={commentDeets}
                      setReplyTo={props.setReplyTo}
                      replyTo={props.replyTo}
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
    <div className="flex-column-between full-height">
      <div>
        <ButtonIcon
          icon={<Icon name="chevron-left" style={{ scale: '2' }} />}
          className="btn-lg mt-4 text-gray"
          onClick={() => {
            if (props.onClose) {
              props.onClose();
            }
          }}
        />
        <h1 className="ml-10 pl-4 mb-0 pb-4 text-left">{screenData.CommentsModal.header}</h1>
      </div>

      <div className={style.middleContainer}>
        {getCommentListView(null)}
      </div>

      <div className={style.commentEntryContainer}>
        <div className={style.commentEntryInput}>
          {props.replyTo
            ? (
                <div className={style.replyLine}>
                  <span className="pl-2">
                    @
                    {props.replyTo[0]}
                  </span>
                  <Icon
                    name="close"
                    fill="darkgrey"
                    width="20"
                    onClick={() => props.setReplyTo(null)}
                  />
                </div>
              )
            : null}

          <TextAreaInput
            className="text-large"
            placeholder={screenData.CommentsModal.commentsPlaceholder}
            onChange={(e: { target: { value: React.SetStateAction<string> } }) => props.setCommentContent(e.target.value)}
          />
        </div>
        <ButtonIcon
          className="btn-lg"
          icon={<Icon name="diving-snorkel" fill="darkgrey" />}
          onClick={() => props.handleCommentInsert()}
        />
      </div>
    </div>
  );
}
