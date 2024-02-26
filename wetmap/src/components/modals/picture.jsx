import React, {useState, useContext} from "react";
import { SelectedPicContext } from"../contexts/selectPicContext"
import FlagIcon from "@mui/icons-material/Flag";
import "./picture.css";

function Picture(props) {
  const { pic, animateFullScreenModal } = props;
  const { setSelectedPic } = useContext(SelectedPicContext);

  let photoName = pic.photoFile.split("/").pop();

  const [imgHeigth, setImgHeigth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const handleModalOpen = (picture) => {
    setSelectedPic(picture)
    animateFullScreenModal()
  }


  const getImageDimensions = async () => {
    let containerWidth = document.getElementsByClassName("picScollA")[0].clientWidth;

    const img = new Image();
    img.src = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`
    const imageBitmap = await createImageBitmap(img)
    let ratio = imageBitmap.height/imageBitmap.width
    setImgWidth(containerWidth)
    setImgHeigth(containerWidth*ratio)

  };

  getImageDimensions()

  
  return (
    <div
      key={pic.id}
      className="pictureBoxQ"
      onClick={() => handleModalOpen(photoName)}
      style={{
        backgroundImage: `url(https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: imgWidth,
        height: imgHeigth,
      }}
    >
      {/* <div className="microp"> */}
        <div className="helper">
          <h4 className="animalLabelP">{pic.label}</h4>
          <a
            className="atagp"
            href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${pic.label}"%20${pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
          >
            <FlagIcon sx={{ color: "red", height: "3vh", width: "3vw" }} />
          </a>
        </div>
      {/* </div> */}

      {/* <img
              src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
              // src={`https://bca075819c975f1f381667bcdff15b92.r2.cloudflarestorage.com/scubaseasons/${photoName}`}
              // src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
              style={{
                width: "100%",
                margin: "3px",
                borderRadius: "2vw",
                objectFit: "cover"
              }}
              /> */}
      <h4 className="userLabel">Added by: {pic.userName}</h4>
    </div>
  );
}

export default Picture;
