import CloseButton from '../closeButton/closeButton';
import style from './fullScreenModal.module.scss';

const FullScreenModal = (props) => {
  return (
    <>
      <div
        className={style.container}
        onClick={props.onModalCancel}
      >
        <img
          src={props.src}
          className={style.image}
          onClick={e => e.stopPropagation()}
        />
        <div className={style.close}>
          <CloseButton onClick={props.onModalCancel} />
        </div>
      </div>
    </>
  );
};

export default FullScreenModal;
