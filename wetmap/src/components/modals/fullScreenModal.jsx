import { useContext, useState, useEffect } from "react";
import { FormGroup, Button } from "reactstrap";
import "./fullScreenModal.css";
import { SelectedPicContext } from "../contexts/selectPicContext";
import CloseIcon from "@mui/icons-material/Close";
import CloseButton from "../closeButton/closeButton";

const FullScreenModal = (props) => {
  const { animateFullScreenModal } = props;
  const { selectedPic } = useContext(SelectedPicContext);
  const [imgHeigth, setImgHeigth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const getImageDimensions = async () => {
    let screenWidthInital = window.innerWidth;
    let screenHeigthInital = window.innerHeight;

    const img = new Image();
    img.src = `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${selectedPic}`
    const imageBitmap = await createImageBitmap(img);
    let ratio = imageBitmap.height/imageBitmap.width;
    let inverseRatio = imageBitmap.width/imageBitmap.height;

    let newWidth;
    let newHeigth;
    if (imageBitmap.height > imageBitmap.width) {
      newHeigth = screenHeigthInital * 0.96;
      newWidth =  screenHeigthInital * 0.96 * inverseRatio;
    } else {
      newWidth = screenWidthInital * 0.96;
      newHeigth = screenWidthInital * 0.96 * ratio;
    }

    if(newHeigth > screenHeigthInital){
      setImgHeigth(screenHeigthInital*0.96);
      setImgWidth((screenHeigthInital*0.96)*inverseRatio);
    } else if (newWidth > screenWidthInital){
      setImgWidth(screenWidthInital*0.96);
      setImgHeigth((screenWidthInital*0.96)*ratio);
    } else {
      setImgWidth(newWidth);
      setImgHeigth(newHeigth);
    }
  };

  useEffect(() => {
    if (selectedPic) {
      getImageDimensions();
    }
  }, [selectedPic])
    

  return (
    <div
      className="bodyDiv"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: selectedPic ? `url(https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${selectedPic})` : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: imgWidth,
        height: imgHeigth,
      }}
    >
      <div className="closerDiv">
        <FormGroup>
          <CloseButton
            id='closeButton'
            onClick={animateFullScreenModal}
            btnStyle={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default FullScreenModal;
