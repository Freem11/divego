import { createContext, useState } from 'react';

export const ModalContext = createContext('');

const ModalContextProvider = ({children}) => {
    const [stack, setStack] = useState([]);
    const [openName, setOpenName] = useState(null);
    const defaultOptions = {
        keepPreviousModal: false
    }

    const modalShow = (component, _options) => {
        const options = {...defaultOptions, ..._options}
        if(component.name === getCurrentModalName()){
            return 
        }

        setStack(prev => {
            for(let modal of stack){
                if(modal.component.name === component.name){
                    // we already have this component in the stack - no need to open it again
                    return prev
                }
            }

            return [...prev, {component, options}]
        })

        setTimeout(() => {
            // open modal with some delay after it's rendered to play the animation
            setOpenName(component.name)
            if(options.keepPreviousModal === false){
                setStack(prev => {
                    return prev.filter(modal => {
                        return modal.component.name === openName
                    })
                })
            }
        }, 1)
    }
    
    const getCurrentModalName = () => {
        return openName
    }
    
    const getPreviousModalName = () => {
        return stack[ stack.length - 2 ] && stack[ stack.length - 2 ].component.name
    }

    const modalClose = (all = false) => {
        // get previous element from stack in order to open it after the current one gets closed
        setOpenName(getPreviousModalName())

        // remove current element from the stack afetr it was closed (wait some time to process the animation)
        const currentOpenName = getCurrentModalName()
        setTimeout(() => {
            setStack(prev => {
                return prev.filter(modal => {
                    return modal.component.name !== currentOpenName
                })
            })
        }, 500);
      }



    return (
        <ModalContext.Provider value={{ modalShow, modalClose, getCurrentModalName, stack}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider;