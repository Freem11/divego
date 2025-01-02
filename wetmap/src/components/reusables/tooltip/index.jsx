import React, { useState } from "react";
import styles from "./style.module.scss";

export const TOOLTIP_DIRECTION = {
    TOP: "top",
    BOTTOM: "bottom",
    LEFT: "left",
    RIGHT: "right",
};

const DELAY = 400;

const Tooltip = ({
    children,
    content,
    direction = TOOLTIP_DIRECTION.TOP,
    delay = DELAY
}) => {
    
    const [isActive, setIsActive] = useState(false);
    let timeout;

    const showTip = () => {
        timeout = setTimeout(() => setIsActive(true), delay);
    };

    const hideTip = () => {
        clearTimeout(timeout);
        setIsActive(false);
    };

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {isActive && (
                <div className={`${styles.tip} ${styles[direction]}`}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
