import React, { SetStateAction } from 'react';
import screenData from '../screenData.json';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import TextInputField from '../textInput';
import TextInput from '../../reusables/textInput';

type CommentsModalViewProps = {
  handleCommentInsert:  () => void
  setCommentContent:    (value: SetStateAction<string>) => void
  setReplyTo: (value: SetStateAction<(number|string)[] | null>) => void
  commentContent: string
  replyTo: (number|string)[] | null
  getCommentListView: (commentId: number | null, level?: number) => React.JSX.Element
  onClose?:                     () => void
};

export default function CommentsModalView(props: CommentsModalViewProps) {
  return (
    <>
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
      <h1 className="mb-0 pb-4">{screenData.CommentsModal.header}</h1>
      </div>

      <div className={style.middleContainer}>
        {' '}
        {props.getCommentListView(null)}
      </div>

      <div className={style.commentEntryContainer}>
        {props.replyTo
          ? (
              <div className={style.replyLine}>
                <p className={style.userText}>
                  @
                  {props.replyTo[0]}
                </p>
                <Icon
                name="close"
                fill="darkgrey"
                width="20"
                onClick={() => props.setReplyTo(null)}
                 />
              </div>
            )
          : null}
        <div className={style.replyBox}>
           <TextInput
              iconRight={
                <Icon
                name="diving-snorkel"
                fill="darkgrey"
                width="30"
                style={{ marginTop: 5, cursor: 'pointer' }}
                onClick={() => props.handleCommentInsert()}
              />
              }
              placeholder={screenData.CommentsModal.commentsPlaceholder}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => props.setCommentContent(e.target.value)}
            />
         
        </div>
      </div>
    </>
  );
}
