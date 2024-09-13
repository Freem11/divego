import { useState } from "react";

import { ModalContext } from "./modalContext";

const modalAnimationDuration = 300

class ModalWindow {
    component = null;
    options = {};
    defaultOptions = {
        keepPreviousModal: false,
    };
    constructor(component, options) {
        this.component = component;
        this.options = { ...this.defaultOptions, ...options };
    }

    get name() {
        let result = this.component?.name ?? "";
        if (this.options?.name) {
            result += this.options.name;
        }
        return result;
    }
}

const ModalContextProvider = (props) => {
    const [stack, setStack] = useState([]);
    const [currentModalName, setCurrentModalName] = useState(null);
    const [freeze, setFreeze] = useState(false);

    const modalShow = (component, options) => {
        const newModalWindow = new ModalWindow(component, options);
        if (newModalWindow.options.keepPreviousModal === false) {
            modalClose(true);
        }

        if (newModalWindow.name === currentModalName) {
            return;
        }

        if (freeze) {
            return;
        }

        setFreeze(true);

        setStack((prev) => {
            for (let modalWindow of stack) {
                // we already have this modal window in the stack - no need to open it again
                if (modalWindow.name === newModalWindow.name) {
                    return prev;
                }
            }

            return [...prev, newModalWindow];
        });

        setTimeout(() => {
            // open modal with some delay after it's rendered to play the animation
            setCurrentModalName(newModalWindow.name);
            setFreeze(false);
        });
    };

    const modalClose = (all = false) => {
        if (!currentModalName) {
            return;
        }
        if (freeze) {
            return;
        }

        setFreeze(true);

        const namesToRemove = [currentModalName];
        if (all) {
            setCurrentModalName(null);
            for (const modalWindow of stack) {
                namesToRemove.push(modalWindow.name);
            }
        } else {
            setCurrentModalName(_getPreviousModalName());
        }
        setTimeout(() => {
            setStack((prev) => {
                return prev.filter((modalWindow) => {
                    
                    return !namesToRemove.includes(modalWindow.name);
                });
            });
            setFreeze(false);
        }, modalAnimationDuration);
    };

    const _getPreviousModalName = () => {
        return stack[stack.length - 2] && stack[stack.length - 2].name;
    };

    return <ModalContext.Provider value={{ modalShow, modalClose, currentModalName, stack, modalAnimationDuration }}>
        {props.children}
    </ModalContext.Provider>;
};

export default ModalContextProvider;
