import {Button} from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({onClick, id, className, btnStyle, iconStyle={ color: "#F0EEEB", width: "2vw", height: "5vh" }}) => {
    return (
        <Button
            variant="text"
            id={id}
            className={className}
            onClick={onClick}
            style={btnStyle}
        >
            <CloseIcon
                sx={iconStyle}
            ></CloseIcon>
        </Button>
    )
}

export default CloseButton