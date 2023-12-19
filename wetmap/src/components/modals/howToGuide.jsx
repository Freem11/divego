import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import "./siteSubmitter.css";
import CloseIcon from "@mui/icons-material/Close";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import "./howToGuide.css";

const HowToGuide = (props) => {

  const { animateLaunchModal } = props;

  return (
    <div className="masterDiv">
      <div className="topRead">
        <div className="titleDiv">
          <h3 style={{ marginTop: 3, marginRight: 85, width: "200%", fontFamily: "Patrick Hand", fontSize: 32}}>How to use Scuba SEAsons</h3>
          <FormGroup>
            <Button
              variant="text"
              id="closeButton2"
              onClick={() => animateLaunchModal()}
              style={{ display: "flex", flexDirection: "column", marginRight: 40, marginTop: 10, backgroundColor: "transparent", border: "none"}}
            >
              <CloseIcon
                sx={{ color: "lightgrey", height: "36px", width: "36px" }}
              ></CloseIcon>
            </Button>
          </FormGroup>
        </div>

        <div className="mainBlurbDiv">
     
        <h1>HI</h1>

        </div>
      </div>

    </div>
  );
};

export default HowToGuide;
