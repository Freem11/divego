import style from './style.module.scss';
import React from 'react';
import { toast } from 'react-toastify';
import Icon from '../../../icons/Icon';

const ShareContentView = ({
  // pic,
  platforms,
  shareUrl,
  shareTitle,
  shareDescription,
}: // handleShareCopyUrl,
{
  pic:              any
  shareUrl:         string
  shareTitle:       string
  shareDescription: string
  platforms: {
    name:     string
    Button:   React.ComponentType<any>
    Icon:     React.ReactNode
    getProps: (
      url: string,
      title: string,
      description?: string,
      imageUrl?: string
    ) => any
  }[]
}) => {
  return (
    <div
      className={style.socialShareContainer}
      onClick={e => e.stopPropagation()}
    >
      {platforms.map((platform) => {
        const { name, Button, Icon, getProps } = platform;
        const buttonProps = getProps(
          shareUrl,
          shareTitle,
          shareDescription,
          // shareImageUrl,
        );

        return (
          <Button
            key={name}
            {...buttonProps}
            className={style.socialButton}
            htmlTitle={`${name} share`}
            aria-label={name}
            onShareWindowClose={() =>
              toast.success(`Shared via ${name}!`, {
                autoClose: 1000,
              })}
          >
            {Icon}
          </Button>
        );
      })}
      <div
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast.success('Link copied to clipboard!', {
            autoClose: 1000,
          });
        }}
        className={style.socialButton}
        style={{
          backgroundColor: 'transparent',
          paddingTop:      '4px',
        }}
        aria-label="Copy url"
        title="Copy url"
      >
        <Icon name="copy" className={style.socialIcon} />
      </div>
    </div>
  );
};

export default ShareContentView;
