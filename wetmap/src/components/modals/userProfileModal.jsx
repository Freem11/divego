import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import InputBase from "@mui/material/InputBase";
import {
  grabProfileById,
  getProfileWithStats,
} from "../../supabaseCalls/accountSupabaseCalls";
import { SessionContext } from "../contexts/sessionContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { ProfileModalContext } from "../contexts/profileModalContext";
import { SelectedProfileContext } from "../contexts/selectedProfileModalContext";
import { AnchorModalContext } from "../contexts/anchorModalContext";
import {
  insertUserFollow,
  deleteUserFollow,
  checkIfUserFollows,
} from "../../supabaseCalls/userFollowSupabaseCalls";
import CloseIcon from "@mui/icons-material/Close";
import "./userProfile.css";

export default function UserProfileModal(props) {
  const { animateProfileModal } = props;
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const [profileCloseState, setProfileCloseState] = useState(false);
  const [imaButState, setImaButState] = useState(false);
  const [followButState, setFollowButState] = useState(false);
  const [userFollows, setUserFollows] = useState(false);
  const [picUri, setPicUri] = useState(null);
  const { profileModal, setProfileModal } = useContext(ProfileModalContext);
  const [userStats, setUserStats] = useState(null);
  const { selectedProfile, setSelectedProfile } = useContext(
    SelectedProfileContext
  );
  const { siteModal, setSiteModal } = useContext(AnchorModalContext);
  const [followData, setFollowData] = useState(activeSession.user.id);

  const handleFollow = async (userName) => {
    // if (profile[0].UserID === picOwnerAccount[0].UserID){
    //   return
    // }

    if (userFollows) {
      deleteUserFollow(followData);
      setUserFollows(false);
    } else {
      if (userStats) {
        let newRecord = await insertUserFollow(
          profile[0].UserID,
          userStats[0].userid
        );
        setFollowData(newRecord[0].id);
        setUserFollows(true);
      }
    }
  };

  useEffect(() => {
    getProfile();

    async function followCheck() {
      let alreadyFollows = await checkIfUserFollows(
        activeSession.user.id,
        selectedProfile
      );
      if (alreadyFollows.length > 0) {
        setUserFollows(true);
        setFollowData(alreadyFollows[0].id);
      }
    }

    followCheck();
  }, []);

  useEffect(() => {
    getProfile();

    async function followCheck() {
      let alreadyFollows = await checkIfUserFollows(
        activeSession.user.id,
        selectedProfile
      );
      if (alreadyFollows.length > 0) {
        setUserFollows(true);
        setFollowData(alreadyFollows[0].id);
      }
    }

    followCheck();
  }, [profileModal]);

  const getProfile = async () => {
    let userID;
    if (selectedProfile) {
      userID = selectedProfile;
    } else {
      userID = activeSession.user.id;
    }

    try {
      const success = await getProfileWithStats(userID);
      if (success) {
        setUserStats(success);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  const toggleProfileModal = () => {
    setProfileModal(false);

    if (selectedProfile) {
      setSiteModal(true);
      setSelectedProfile(null);
    }
  };

  return (
    <div className="containerBox">
      <div className="titleDiv">
        <h3
          style={{
            marginLeft: "1vw",
            width: "100vw",
            textAlign: "left",
            fontFamily: "Patrick Hand",
            fontSize: "2vw",
            // backgroundColor: "pink"
          }}
        >
          {selectedProfile
            ? userStats[0].username + "'s Diving"
            : "My Diver Profile"}
        </h3>
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => toggleProfileModal()}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon
              sx={{ color: "lightgrey", width: "2vw", height: "5vh" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>

      <div className="inputContainer">
        {selectedProfile ? (
          <div onClick={() => handleFollow()} className={userFollows ? "followButtoAlt" : "followButton"}>
            <Label
              style={{
                fontFamily: "Itim",
                fontWeight: "bold",
                color: userFollows ? "black" : "pink",
                cursor: "pointer",
                fontSize: "1vw",
              }}
            >
              {userFollows
                ? "Following " + (userStats && userStats[0].username)
                : "Follow " + (userStats && userStats[0].username)}
            </Label>
          </div>
        ) : (
          <>
            <div className="inputbox">
              <FormGroup>
                <InputBase
                  id="standard-basic"
                  placeholder="Diver Name"
                  type="text"
                  name="userField"
                  value={userStats && userStats[0].username}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontFamily: "Itim",
                      fontSize: "2vw",
                      textOverflow: "ellipsis",
                      backgroundColor: "#538BDB",
                      height: "5vh",
                      width: "24vw",
                      color: "#F0EEEB",
                      borderRadius: "120px",
                      boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                    },
                  }}
                />
              </FormGroup>
            </div>

            <div className="inputbox">
              <FormGroup>
                <InputBase
                  id="standard-basic"
                  placeholder="Email"
                  type="text"
                  name="emailField"
                  value={userStats && userStats[0].email}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontFamily: "Itim",
                      fontSize: "2vw",
                      textOverflow: "ellipsis",
                      backgroundColor: "#538BDB",
                      height: "5vh",
                      width: "24vw",
                      color: "#F0EEEB",
                      borderRadius: "120px",
                      boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                    },
                  }}
                />
              </FormGroup>
            </div>
          </>
        )}

        <div className="statsContainer">
          <div className="inputboxMini">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="PhotoCount"
                type="text"
                name="photoCountField"
                value={
                  "Sea Life: " + (userStats && " " + userStats[0].photocount)
                }
                contentEditable={false}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: "1.5vw",
                    textOverflow: "ellipsis",
                    backgroundColor: "#538BDB",
                    height: "5vh",
                    width: "12vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>

          <div className="inputboxMini">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="DiveSiteCount"
                type="text"
                name="diveSiteCountField"
                value={
                  "Dive Sites: " +
                  (userStats && " " + userStats[0].divesitecount)
                }
                contentEditable={false}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: "1.5vw",
                    textOverflow: "ellipsis",
                    backgroundColor: "#538BDB",
                    height: "5vh",
                    width: "12vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>

          <div className="inputboxMini">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="FollowerCount"
                type="text"
                name="followerCountField"
                value={
                  "Followers: " +
                  (userStats && " " + userStats[0].followercount)
                }
                contentEditable={false}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: "1.5vw",
                    textOverflow: "ellipsis",
                    backgroundColor: "#538BDB",
                    height: "5vh",
                    width: "12vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>

          <div className="inputboxMini">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="CommentCount"
                type="text"
                name="commentCountField"
                value={
                  "Comments: " + (userStats && " " + userStats[0].commentcount)
                }
                contentEditable={false}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: "1.5vw",
                    textOverflow: "ellipsis",
                    backgroundColor: "#538BDB",
                    height: "5vh",
                    width: "12vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>

          <div className="inputboxMini">
            <FormGroup>
              <InputBase
                id="standard-basic"
                placeholder="LikeCount"
                type="text"
                name="likeCountField"
                value={"Likes: " + (userStats && " " + userStats[0].likecount)}
                contentEditable={false}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontFamily: "Itim",
                    fontSize: "1.5vw",
                    textOverflow: "ellipsis",
                    backgroundColor: "#538BDB",
                    height: "5vh",
                    width: "12vw",
                    color: "#F0EEEB",
                    borderRadius: "120px",
                    boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
                  },
                }}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
