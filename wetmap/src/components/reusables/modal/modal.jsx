import React, { useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../../contexts/modalContext';
import { TutorialContext } from '../../contexts/tutorialContext';

import style from './modal.module.scss';

export default function Modal(props) {
  const rootRef = useRef(null);
  const modalContext = useContext(ModalContext);
  const { tutorialRunning } = useContext(TutorialContext);

  useEffect(() => {
    const handleWrapperClick = (e) => {
      if (!modalContext.stack?.length) {
        // not need to close modal if none is open
        return;
      }

      if (rootRef.current.contains(e.target)) {
        // no need to close modal if click inside modal wrapper
        return;
      }

      if (tutorialRunning) {
        return;
      }

      // close modal if click outside of modal wrapper
      modalContext.modalCancel();
    };

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        modalContext.modalCancel();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);
    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [modalContext]);

  if (!modalContext.stack?.length) {
    return <div className={`${style.modalWrapper}`} ref={rootRef}></div>;
  }

  const openStyle = {
    transform:  'translateY(0)',
    transition: `transform ${modalContext.modalAnimationDuration}ms ease-in-out`,
  };

  const closeStyle = {
    transition: `transform ${modalContext.modalAnimationDuration}ms ease-out`,
  };

  return (
    <div className={`${style.modalWrapper} ${style.active}`} ref={rootRef}>
      {modalContext.stack.map((modalWindow) => {
        return (
          <div
            className={`${style.modalContainer} ${style[modalWindow.options.size]}`}
            style={modalWindow.name === modalContext.currentModalName ? openStyle : closeStyle}
            key={modalWindow.name}
          >
            <modalWindow.component
              {...modalWindow.options}
              onModalSuccess={() => {
                modalContext.modalSuccess();
              }}
              onModalCancel={() => {
                modalContext.modalCancel();
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
