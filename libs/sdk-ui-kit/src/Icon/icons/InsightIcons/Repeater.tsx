// (C) 2024-2025 GoodData Corporation
import React from "react";
import { IIconProps } from "../../typings.js";

/**
 * @internal
 */
export const Repeater: React.FC<IIconProps> = ({ className, width = 32, height = 30, color, ariaHidden }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={ariaHidden}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 10.5H4V5.5H17V10.5Z"
                fill={color ?? "#B0BECA"}
                fillOpacity="0.6"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 17.5H4V12.5H17V17.5Z"
                fill={color ?? "#B0BECA"}
                fillOpacity="0.6"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 24.5H4V19.5H17V24.5Z"
                fill={color ?? "#B0BECA"}
                fillOpacity="0.6"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28 10.5H19V5.5H28V10.5ZM25.2944 6.29199L27.3762 8.67123L26.6237 9.32974L25.2055 7.70898L23.0169 9.65437L21.761 8.6496L20.3254 9.88011L19.6746 9.12086L21.739 7.35137L22.983 8.34659L25.2944 6.29199Z"
                fill={color ?? "#B0BECA"}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 17.5H28V12.5H19V17.5ZM25.1666 15.4996L27.3 13.8996L26.7 13.0996L24.8333 14.4996H21.8333L19.7 16.0996L20.3 16.8996L22.1666 15.4996H25.1666Z"
                fill={color ?? "#B0BECA"}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 24.5H28V19.5H19V24.5ZM27.3536 22.6465L25 20.293L22.7929 22.5001H20V23.5001H23.2071L25 21.7072L26.6464 23.3536L27.3536 22.6465Z"
                fill={color ?? "#B0BECA"}
            />
        </svg>
    );
};
