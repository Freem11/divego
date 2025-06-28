import React from 'react';
import style from './style.module.scss';
import { toast } from 'react-toastify';
import Icon from '../../../icons/Icon';
import { SocialPlatform } from './index';

interface ShareContentViewProps {
  shareUrl:         string
  shareTitle:       string
  shareDescription: string
  platforms:        SocialPlatform[]
}

const ShareContentView: React.FC<ShareContentViewProps> = ({
  platforms,
  shareUrl,
  shareTitle,
  shareDescription,
}) => {
  return (
    <div
      className={style.socialShareContainer}
      onClick={e => e.stopPropagation()}
    >
      {platforms.map((platform) => {
        const { name, Button, Icon, platformProps } = platform;

        return (
          <Button
            key={name}
            {...platformProps}
            title={shareTitle}
            description={shareDescription}
            url={shareUrl}
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
