import * as React from "react";

function CheckIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke={props.stroke} strokeWidth={1.5} className={props.iconclass} viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}
export default CheckIcon;
