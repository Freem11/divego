import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { PhotosGroupedByDate } from '../../../entities/photos';

export type DiveSiteViewProps = {
  showPicUploaderButton: boolean
  onClose?:              () => void
  openPicUploader:       () => void
  handleImageSelection:  (event: React.ChangeEvent<HTMLInputElement>) => void
  handleProfileSwitch:   (username: string) => Promise<void>
  onDiveSiteBioChange:   (newValue: string) => void
  diveSite:              DiveSiteWithUserName | null
  diveSitePics:          PhotosGroupedByDate[] | null
  isPartnerAccount:      boolean
  headerPictureUrl:      string | null
};
