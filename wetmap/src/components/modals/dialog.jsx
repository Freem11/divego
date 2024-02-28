import { useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { SessionContext } from "../contexts/sessionContext";
import { addDeletedAccountInfo, deleteProfile } from "../../supabaseCalls/accountSupabaseCalls";
import { userDelete, signOut } from "../../supabaseCalls/authenticateSupabaseCalls";
import "./dialog.css";

const ActDelDialog = (props) => {
  const { openDialog, setOpenDialog } = props;
  const { activeSession, setActiveSession } = useContext(SessionContext);
  let first = "";
  let last = "";

  if (activeSession.user.user_metadata.firstName) {
    first = activeSession.user.user_metadata.firstName;
  } 

  if (activeSession.user.user_metadata.lastName) {
    last = activeSession.user.user_metadata.lastName;
  } 

  let blurb = `:${activeSession.user.id}`;

  const handleAccountDelete = async () => {
    await addDeletedAccountInfo({
      firstName: first,
      lastName: last,
      email: activeSession.user.email,
      UserID: activeSession.user.id,
    });

    await deleteProfile(activeSession.user.id)
    await userDelete(activeSession.user.id);
    await setActiveSession(null);
    await localStorage.removeItem("token");
    await signOut();
    await setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog}>
      <DialogTitle>You Are About To Delete Your Scuba SEAsons Account</DialogTitle>
      <DialogContent>
        Are you sure you want to delete your account? <br></br>
        <br></br> Please note that deleting your account will not delete your
        previous dive site or photo submissions, please contact us if you wish
        to have those removed from the community
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccountDelete}>Delete My Account</Button>
        <Button onClick={() => setOpenDialog(false)}>Cancel Request</Button>
        <a
          className="emailTag"
          href={`mailto:DiveGo2022@gmail.com?subject=Delete%20Account%20Request%20${blurb}&body=Hello%20I%20am%20deleting%20my%20DiveGo%20account%20and%20would%20also%20like%20to%20also%20have%20the%20following%20of%20my%20submissions%20removed%20as%20well%0D%0A%0D%0A%0D%0A%0D%0AMy%20Dive%20Sites%20(Y/N)%0D%0A%0D%0A%0D%0A%0D%0AMy%20Photo%20Submissions%20(Y/N)%0D%0A%0D%0A%0D%0A%0D%0AAs%20removing%20these%20submisions%20would%20diminish%20the%20experience%20for%20others%20divers%20in%20the%20community,%20would%20you%20be%20willing%20to%20negotiate%20with%20DiveGo%20to%20allow%20these%20to%20stay%20in%20the%20app?%20(Y/N)`}
          onClick={() => setOpenDialog(false)}
        >
          Contact Scuba SEAsons
        </a>
      </DialogActions>
    </Dialog>
  );
};

export default ActDelDialog;
