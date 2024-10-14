import React from 'react';
import { ModalWindowSize } from './constants';

const defaultOptions = {
  name:              null as null | string,
  size:              ModalWindowSize.M as ModalWindowSize,
  keepPreviousModal: false as boolean,
  onSuccessCallback: null as null | (() => void),
  onCancelCallback:  null as null | (() => void),
};

export default class ModalWindow {
  component: React.FC;
  options:   typeof defaultOptions;

  constructor(component: React.FC, options: object) {
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
