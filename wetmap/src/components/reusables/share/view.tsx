import React, { ReactNode } from 'react';
import style from './style.module.scss';
import { toast } from 'react-toastify';
import Icon from '../../../icons/Icon';
import { SocialPlatform } from './index';

interface ShareContentViewProps {
  shareUrl:         string
  shareTitle:       string
  shareDescription: string
  platforms:        SocialPlatform[]
  trigger:          ReactNode
  onOpenChange?:    (isOpen: boolean) => void
}

const ShareContentView: React.FC<ShareContentViewProps> = ({
  platforms,
  shareUrl,
  shareTitle,
  shareDescription,
  trigger: TriggerComponent,
  onOpenChange,
}) => {
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <div className={style.shareContainer}>
      <div
        onClick={() => {
          setShowPopup(!showPopup);
          if (onOpenChange !== undefined) onOpenChange(!showPopup);
        }}
        style={{ cursor: 'pointer' }}
      >
        {TriggerComponent}
      </div>
      <div
        className={`${style.socialShareContainer} ${showPopup ? style.show : ''} bg-blue`}
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
              onShareWindowClose={() => {
                if (onOpenChange !== undefined) onOpenChange(false);
                toast.success(`Shared via ${name}!`, {
                  autoClose: 1000,
                });
                setShowPopup(false);
              }}
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
    </div>
  );
};

export default ShareContentView;
