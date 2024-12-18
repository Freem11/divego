import React from 'react';

const defaultOptions = {
  name:              null as null | string,
  size:              'medium' as ModalWindowSize,
  allowCancel:       true as boolean,
  keepPreviousModal: false as boolean,
  onSuccessCallback: null as null | (() => void),
  onCancelCallback:  null as null | (() => void),
};

export type ModalWindowSize = 'small' | 'medium' | 'large' | 'full';

export type ModalWindowOptions = Partial<typeof defaultOptions>;

/**
 * Fields and methods to control the modal.
 */
export type ModalHandle = {
  stack:                  ModalWindow[]
  modalShow:              ModalShow
  modalPause:             () => void
  modalResume:            () => void
  modalCancel:            () => void
  modalSuccess:           () => void
  currentModalName:       string | null
  modalAnimationDuration: number
};

/**
 * Properties to be passed to the component in the modal implicitly.
 * For example: If we want to show the Login component in the modal,
 * these properties will be passed to the Login component automatically
 */
export type ModalHandleProps = {
  registerModalCancelCallback: (callback: () => void) => void
  onModalCancel:               () => void
  onModalSuccess:              () => void
};

export type ModalCloseCallbackName = 'onSuccessCallback' | 'onCancelCallback' | null;


/**
 * component - any react component to show in the modal.
 * Props of the component can be passed to the "options" parameter along with ModalWindowOptions
 * P - props of the component
 */
export type ModalShow = <P extends object>(component: React.FC<P>, options?: ModalWindowOptions & P) => void;

export default class ModalWindow {
  component: React.FC;
  options:   ModalWindowOptions;

  constructor(component: React.FC<any>, options: ModalWindowOptions = {}) {
    this.component = component;
    this.options = { ...defaultOptions, ...options };
  }

  get name() {
    let result = this.component?.name ?? '';
    if (this.options?.name) {
      result += this.options.name;
    }
    return result;
  }
}
