import {Button} from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({onClick, id, className, btnStyle={backgroundColor: "transparent", border: "none", cursor: "pointer"}, iconStyle={ color: "#F0EEEB", fontSize: "2rem" }}) => {
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