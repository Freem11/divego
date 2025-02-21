import React, { useContext } from 'react';
import ConfirmDeleteAccountView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import { addDeletedAccountInfo, deleteProfile } from '../../../supabaseCalls/accountSupabaseCalls';
import { userDelete } from '../../../supabaseCalls/authenticateSupabaseCalls';
import screenData from '../screenData.json';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../contexts/userProfileContext';

type ConfirmDeleteAccountProps = Partial<ModalHandleProps>;

export default function ConfirmDeleteAccount(props: ConfirmDeleteAccountProps) {
  const { profile, session, logout } = useContext(UserProfileContext);

  const handleAccountDelete = async () => {
    if (!profile) {
      toast.error(screenData.ConfirmDeleteAccount.errorDeleting);
      return;
    }

    try {
      const deleteAccountResponse = await addDeletedAccountInfo({
        lastName:  session?.user.user_metadata.firstName || '',
        firstName: session?.user.user_metadata.lastName || '',
        UserID:    profile.UserID,
        email:     profile.Email,
      });
      if (deleteAccountResponse.error) {
        throw new Error(deleteAccountResponse.error.message);
      }

      const deleteProfileResponse = await deleteProfile(profile.UserID);
      if (deleteProfileResponse.error) {
        throw new Error(deleteProfileResponse.error.message);
      }

      const userDeleteResponse = await userDelete(profile.UserID);
      if (userDeleteResponse.error) {
        throw new Error(userDeleteResponse.error.message);
      }

      logout();
    } catch (error) {
      console.error(error);
      toast.error(screenData.ConfirmDeleteAccount.errorDeleting);
    }
  };

  const handleOnContact = () => {
    const blurb = `:${profile?.UserID}`;
    const href = `mailto:${screenData.ConfirmDeleteAccount.contantEmail}?subject=Delete%20Account%20Request%20${blurb}&body=Hello%20I%20am%20deleting%20my%20Scube%20SEAsons%20account%20and%20would%20also%20like%20to%20also%20have%20the%20following%20of%20my%20submissions%20removed%20as%20well%0D%0A%0D%0A%0D%0A%0D%0AMy%20Dive%20Sites%20(Y/N)%0D%0A%0D%0A%0D%0A%0D%0AMy%20Photo%20Submissions%20(Y/N)%0D%0A%0D%0A%0D%0A%0D%0AAs%20removing%20these%20submisions%20would%20diminish%20the%20experience%20for%20others%20divers%20in%20the%20community,%20would%20you%20be%20willing%20to%20negotiate%20with%20the%20Scuba%20SEAsons%20team%20to%20allow%20these%20to%20stay%20in%20the%20app?%20(Y/N)`;
    window.location.href = href;
  };


  const handleClose = () => props?.onModalCancel?.();

  return (
    <ConfirmDeleteAccountView onClose={handleClose} onContactUs={handleOnContact} onDelete={handleAccountDelete} />
  );
}
