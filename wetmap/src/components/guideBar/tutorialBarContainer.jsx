import React from "react";
import { useState, useContext, useEffect } from "react";
import { TutorialResetContext } from "../contexts/tutorialResetContext";
import { TutorialContext } from "../contexts/tutorialContext";
import { IterratorContext } from "../contexts/iterratorContext";
import { Iterrator2Context } from "../contexts/iterrator2Context";
import { Iterrator3Context } from "../contexts/iterrator3Context";
import { ChapterContext } from "../contexts/chapterContext";
import { SessionContext } from "../contexts/sessionContext";
import { UserProfileContext } from "../contexts/userProfileContext";
import { grabProfileById } from "../../supabaseCalls/accountSupabaseCalls";
import "./tutorialbar.css";

export default function TutorialBar() {
  const { tutorialReset, setTutorialReset } = useContext(TutorialResetContext);
  const { itterator, setItterator } = useContext(IterratorContext);
  const { itterator2, setItterator2 } = useContext(Iterrator2Context);
  const { itterator3, setItterator3 } = useContext(Iterrator3Context);
  const { activeSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);

  const { chapter, setChapter } = useContext(ChapterContext);
  const [tutorialList, setTutorialList] = useState(null);
  const [count, setCount] = useState(0);

  const Tut1List = [
    "Getting around the map",
    "Dive sites",
    "Changed dive site",
    "Exit Guide",
  ];
  const Tut2List = [
    "Checking for a dive site",
    "Adding your dive sites",
    "Placing the pin",
    "Exit Guide",
  ];
  const Tut3List = [
    "Contributing photos overview",
    "Adding your photo",
    "Name that sea creature!",
    "Dropping the pin",
    "Exit Guide",
  ];

  const getProfile = async () => {
    let sessionUserId = activeSession.user.id;
    // let sessionUserId = 'acdc4fb2-17e4-4b0b-b4a3-2a60fdfd97dd'
    try {
      const success = await grabProfileById(sessionUserId);
      if (success) {
        let bully = success[0].UserName;
        if (bully == null || bully === "") {
          setProfile(false);
        } else {
          setProfile(success);
        }
      }
    } catch (e) {
      console.log({ title: "Error", message: "e.message" });
    }
  };

  const handleList = async () => {
    setCount((prev) => prev + 1);

    if (count % 2 !== 0) {
      setTutorialList(null);
    } else {
      if (typeof itterator === "number") {
        setTutorialList(Tut1List);
      }
      if (typeof itterator2 === "number") {
        setTutorialList(Tut2List);
      }
      if (typeof itterator3 === "number") {
        setTutorialList(Tut3List);
      }
    }
  };

  const handleShift = async (listItem) => {
    let profileCheck = await getProfile();
    let bully;

    if (profile) {
      bully = profile[0].UserName;
    } else {
      bully = "";
    }

    if (bully == null || bully === "") {
      return;
    } else {
      setTutorialList(null);
      setChapter(listItem);
      
    }
  };

  return (
    <div className="containerBar" pointerEvents={"box-none"}>
        <div
        className="guidebuttonBar"
        onClick={handleList}
        >
          <p
           className="guidetextBar"
          >
            Guide Active
          </p>
        </div>

        <div className="library">
          {tutorialList &&
            tutorialList.length > 0 &&
            tutorialList.map((listItem) => {
              return (
                  <div
                    key={listItem}
                    className="chapter"
                    onClick={() => handleShift(listItem)}
                  >
                    <p
                      onClick={() => handleShift(listItem)}
                      className="chapterItem"
                    >
                      {listItem}
                    </p>
                    <div style={{height: 1, width: "101%", backgroundColor: "white", marginLeft: -2}}></div>
                  </div>
              );
            })}
        </div>
    </div>
  );
}
