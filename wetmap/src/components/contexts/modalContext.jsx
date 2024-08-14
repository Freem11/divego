import { createContext, useState } from 'react';

export const ModalContext = createContext('');

const ModalContextProvider = ({children}) => {
    const [modals, setModals] = useState([]);
    const [isOpen, setOpen] = useState(false);
  
    const modalShow = (component, options) => {
      setModals(prev => [...prev, {component, options}])
    }
    
    const modalClose = () => {
        setOpen(false)
        setTimeout(() => {
            setModals(prev => {
                 return prev.slice(0, -1)
            })
        }, 200);
      }

    return (
        <ModalContext.Provider value={{ modalShow, modalClose, modals, isOpen, setOpen }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider;