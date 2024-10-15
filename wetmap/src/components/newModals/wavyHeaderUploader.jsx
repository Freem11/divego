import React, { useState, useEffect } from "react";
import {
  uploadphoto,
  removePhoto,
} from "../../cloudflareBucketCalls/cloudflareAWSCalls";
import screenData from "./screenData.json";
// import { chooseImageHandler } from "./imageUploadHelpers";
//import { colors, primaryButtonAlt, buttonTextAlt } from "../styles";

export default function WavyHeaderUploader({
  customStyles,
  image,
  setPinValues,
  pinValues,
}) {
  const [picUri, setPicUri] = useState(null);

  useEffect(() => {
    if (image) {
      let photoName = image.split("/").pop();
      setPicUri(
        `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`
      );
    }
  }, [image]);

  const handleImageUpload = async () => {
    try {
      const image = await chooseImageHandler();
      if (image) {
        let uri = image.assets[0].uri;
        let extension = image.assets[0].uri.split(".").pop();
        const fileName = Date.now() + "." + extension;

        //create new photo file and upload
        let picture = await fetch(uri);
        picture = await picture.blob();
        await uploadphoto(picture, fileName);
        if (pinValues.PicFile !== null || pinValues.PicFile === "") {
          await removePhoto({
            filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
            fileName: pinValues.PicFile.split("/").pop(),
          });
        }

        setPinValues({
          ...pinValues,
          PicFile: `animalphotos/public/${fileName}`,
        });
      }
    } catch (e) {
      console.log("error: Photo Selection Cancelled", e.message);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: '55%',
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 10,
      }}
    >
      {/* {picUri ? (
        <div
          style={{
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "orange",
          }}
        >
          <img
            source={{ uri: picUri }}
            style={{
              resize: "cover",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            backgroundColor: "blue",
          }}
        >
          <div style={null} onClick={handleImageUpload}>
            <p style={null}>{screenData.PicUploader.uploadButton}</p>
          </div>
        </div>
      )} */}
      <div
        style={{
          display: "flex",
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <svg
          style={{
            flex: 1,
            backgroundColor: "transparent",
            zIndex: 5,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,320L48,272C96,224,192,128,288,80C384,32,480,32,576,69.3C672,107,768,181,864,229.3C960,277,1056,299,1152,293.3C1248,288,1344,256,1402,176L1440,110L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
