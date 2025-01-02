import React, { useState, ReactNode } from "react";
import styles from "./style.module.scss";

export const TOOLTIP_DIRECTION = {
    TOP: "top",
    BOTTOM: "bottom",
    LEFT: "left",
    RIGHT: "right",
} as const;

type TooltipDirection = typeof TOOLTIP_DIRECTION[keyof typeof TOOLTIP_DIRECTION];

const DELAY = 400;

type TooltipProps = {
    children: ReactNode;
    content: ReactNode;
    direction?: TooltipDirection;
    delay?: number;
};

export default function Tooltip({
    children,
    content,
    direction = TOOLTIP_DIRECTION.TOP,
    delay = DELAY
}: TooltipProps) {
    
    const [isActive, setIsActive] = useState(false);
    let timeout: ReturnType<typeof setTimeout>;

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
}
