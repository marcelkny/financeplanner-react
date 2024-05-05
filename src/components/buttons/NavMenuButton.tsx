import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const buttonStyle = "hover:cursor-pointer";

export default function NavMenuButton({ caption, href}: { caption: string; href?: string; }) {
    const navigate = useNavigate();
    const navFunction = useCallback(
        (target: string) => {
            navigate(target);
        },
        [navigate]
    );
    return (
        <div
            className={buttonStyle}
            onClick={() => {
                if(href){
                    navFunction(href);
                }
            }}
        >
            <span className="text-xl">{caption}</span>
        </div>
    );
}
