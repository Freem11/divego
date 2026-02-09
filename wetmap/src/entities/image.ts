export type Image = {
  file_name:     string
  public_domain: string
  sm:            string
  md:            string
  lg:            string
  xl:            string
};

export enum IMAGE_SIZE {
  SM = 'sm',  // width 240px
  MD = 'md',  // width 480px
  LG = 'lg',  // width 960px
  XL = 'xl',  // width 1920px
}
