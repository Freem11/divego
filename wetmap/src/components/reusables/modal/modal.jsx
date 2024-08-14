import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../contexts/modalContext";
import style from './modal.module.scss';


export default function Modal(props) {

  const { modalShow, modalClose, modals, isOpen, setOpen } = useContext(ModalContext);
  

  const rootRef = useRef(null);

  useEffect(() => {
    if(modals.length){
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [modals]);


  useEffect(() => {
    const handleWrapperClick = (e) => {
      if(!isOpen){
        return
      }
      if (rootRef.current.contains(e.target)){
        return
      }
      modalClose?.()
    };
    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        modalClose?.();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [modalClose]);

 



  return <div className={`modal2 ${modals?.length ? "active" : ""} ${isOpen ? "open" : ""}`} id="modal-id" ref={rootRef}></div>

  
  return <div className={`modal2 ${modals?.length ? "active" : ""} ${isOpen ? "open" : ""}`} id="modal-id" ref={rootRef}>
            
            {modals.map((modal,i) => <div className="modal-container" key={i}>
                        {/* <div className="modal-header">
                            <a href="#close" onClick={modalClose} className="btn btn-clear float-right" aria-label="Close"></a>
                            <div className="modal-title h5">{modal.title}</div>
                        </div> */}
                        <div className="modal-body">
                            <div className="content">
                                {<modal.component 
                                    onFinish={() => {modalClose()}}
                                />}
                            </div>
                        </div>
                        {/* <div class="modal-footer">
                        ...
                        </div> */}
                    </div>
            )}

        </div>
}