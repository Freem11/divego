import React, {useContext, useEffect, useRef } from "react";
import { ModalContext } from "../../contexts/modalContext";
import style from './modal.module.scss';

export default function Modal(props) {

  const rootRef = useRef(null);
  const modalContext = useContext(ModalContext);


  useEffect(() => {
    const handleWrapperClick = (e) => {
      if(!modalContext.getCurrentModalName()){
        // not need to close modal if none is open
        return
      }

      if (rootRef.current.contains(e.target)){
        // no need to close modal if click inside modal wrapper
        return
      }

      // close popul if click outside of modal wrapper
      modalContext.modalClose()
    }

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        modalContext.modalClose();
      }
    };

    window.addEventListener('click', handleWrapperClick)
    window.addEventListener('keydown', handleEscapePress)
    return () => {
      window.removeEventListener('click', handleWrapperClick)
      window.removeEventListener('keydown', handleEscapePress)
    };
  }, [modalContext]);



  return <div className={`${style.modalWrapper} ${modalContext.stack?.length ? style.active : ""}`} ref={rootRef}>
        {modalContext.stack?.map((modal) => <div className={`${style.modalContainer} ${modal.component.name === modalContext.getCurrentModalName() ? style.open : ""}`} key={modal.component.name}>
          {<modal.component 
            onFinish={() => {modalContext.modalClose()}}
          />}
          </div>
        )}
  </div>
}