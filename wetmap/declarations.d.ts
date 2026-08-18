declare module '*.module.scss';

declare module '*.wasm?url' {
  const src: string;
  export default src;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
