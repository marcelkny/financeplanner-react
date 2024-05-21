import * as React from "react";

const SvgComponent = (props: any) => (
    <svg className={props.dimensions} viewBox="0 0 129.876 130.02" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            style={{
                fill: props.fill,
                fillOpacity: 1,
                strokeWidth: 2.35335,
                strokeLinecap: "round",
                strokeLinejoin: "round",
            }}
            d="M58.513 1.19A47.898 65.01 0 0 0 10.615 66.2a47.898 65.01 0 0 0 47.898 65.011 47.898 65.01 0 0 0 47.898-65.01A47.898 65.01 0 0 0 58.513 1.19Zm-.058 36.497A21.037 28.593 0 0 1 79.492 66.28a21.037 28.593 0 0 1-21.037 28.593A21.037 28.593 0 0 1 37.418 66.28a21.037 28.593 0 0 1 21.037-28.593Z"
            transform="matrix(1.35575 0 0 1 -14.391 -1.19)"
        />
        <g
            style={{
                fill: props.fill,
                fillOpacity: 1,
            }}
        >
            <ellipse
                style={{
                    fill: props.fill,
                    strokeWidth: 0.620299,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fillOpacity: 1,
                }}
                cx={66.05}
                cy={66.168}
                rx={14.728}
                ry={14.689}
                transform="translate(-1.08 -1.19)"
            />
        </g>
    </svg>
);

export default SvgComponent;
