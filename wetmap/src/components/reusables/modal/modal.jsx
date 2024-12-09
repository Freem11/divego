import React, { useContext, useEffect, useRef } from 'react';
import { ModalContext } from './context';

import style from './modal.module.scss';

export default function Modal() {
  const rootRef = useRef(null);
  const modalContext = useContext(ModalContext);

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

      if (!document.body.contains(e.target)) {
        // In some cases we have dynamic conatent in the modal (e.g. dropdown lists)
        // Some elements might be removed by some other onClick handlers (when we select item from the dropdown list - dropdown closes)
        // Current onClick handler will close the modal because of the previous condition - e.target does not belong modal wrapper anymore
        // So current condition will not let us close the modal if we clicked on the element that was removed by some other onClick handler

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
            data-modal-name={modalWindow.name}
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
              registerModalCancelCallback={(callback) => {
                modalWindow.options.onCancelCallback = callback;
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
