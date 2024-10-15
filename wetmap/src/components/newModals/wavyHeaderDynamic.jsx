import React, { useState, useEffect } from "react";
// import { colors } from "../styles";

export default function WavyHeaderDynamic({ customStyles, image, defaultImg }) {
  const [picUri, setPicUri] = useState(null);

  useEffect(() => {
    if (image) {
      let photoName = image.split("/").pop();
      setPicUri(
        `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`
      );
    } else {
      setPicUri(null)
    }
  }, [image, picUri]);

  return (
    <div style={null}>
        {picUri ? (
          <div style={null}>
            <img
              source={{ uri: picUri }}
              style={null}
            />
             </div>
        ) : (
          defaultImg === "diveSitePhoto" ?
          <div style={null}>
            <img
              source={require("../png/boat.png")}
              style={null}
            /> 
            </div>
            :
            <div style={null}>
            <img
            source={require("../png/blackManta.png")}
            style={null}
          /> 
          </div>
        )}
        <div
          style={{
            // flex: 1,
          justifyContent: 'flex-end',
          height: "150%",
          backgroundColor: "pink",
          }}
        >
          <svg
            height={'100%'}
            width={"100%"}
            pointerEvents={'none'}
            viewBox="0 0 1440 320"
            style={{
              flex: 1,
              marginLeft: 0,
              backgroundColor: "blue",
              zIndex: 5,
            }}
          >
            <path
              fill="pink"
              d="M 0,700 L 0,262 C 123.33333333333331,187.60000000000002 246.66666666666663,113.20000000000002 401,132 C 555.3333333333334,150.79999999999998 740.6666666666667,262.8 919,300 C 1097.3333333333333,337.2 1268.6666666666665,299.6 1540,102 L 1440, 2200 L 0,2200 Z"
            />
          </svg>
        </div>
    </div>
  );
}