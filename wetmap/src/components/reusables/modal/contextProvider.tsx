import React, { useState } from 'react';

import { ModalContext } from './context';
import ModalWindow, { ModalCloseCallbackName, ModalShow } from './types';

const modalAnimationDuration = 300;

const ModalContextProvider = ({ children }: any) => {
  const [currentModalName, setCurrentModalName] = useState<string | null>(null);
  const [stack, setStack] = useState<ModalWindow[]>([]);
  const [freeze, setFreeze] = useState<boolean>(false);
  const [paused, setPause] = useState<boolean>(false);

  const modalShow: ModalShow = (component, options) => {
    const newModalWindow = new ModalWindow(component, options);

    if (newModalWindow.name === currentModalName) {
      return;
    }

    if (newModalWindow.options.keepPreviousModal === false) {
      _modalClose(true);
    }

    if (freeze) {
      return;
    }

    setFreeze(true);

    setStack((prev) => {
      for (const modalWindow of prev) {
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

  const modalSuccess = () => {
    _modalClose(false, 'onSuccessCallback');
  };

  const modalCancel = () => {
    if (paused) {
      return;
    }
    if (stack.length && stack[stack.length - 1].options.allowCancel === false) {
      return;
    }
    _modalClose(false, 'onCancelCallback');
  };

  const modalPause = () => {
    setPause(true);
    setCurrentModalName(null);
  };

  const modalResume = () => {
    setCurrentModalName(_getCurrentModalName());
    setTimeout(() => {
      setPause(false);
    });
  };

  const _modalClose = (all = false, callback: ModalCloseCallbackName = null) => {
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
          const shouldBeRemoved = namesToRemove.includes(modalWindow.name);
          if (shouldBeRemoved && callback && modalWindow.options[callback] && typeof modalWindow.options[callback] === 'function') {
            modalWindow.options[callback].apply(modalWindow);
          }
          return !shouldBeRemoved;
        });
      });
      setFreeze(false);
    }, modalAnimationDuration);
  };

  const _getPreviousModalName = () => {
    return stack[stack.length - 2] && stack[stack.length - 2].name;
  };

  const _getCurrentModalName = () => {
    return stack[stack.length - 1] && stack[stack.length - 1].name;
  };


  return (
    <ModalContext.Provider value={{
      stack,
      modalShow,
      modalPause,
      modalResume,
      modalCancel,
      modalSuccess,
      currentModalName,
      modalAnimationDuration,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
