import { useNavigate } from "react-router-dom";
import { useCurrentNavigation } from "../../context/NavigationContext";
import { useCallback } from "react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

export function HeaderBackNavigation({ target_id, title }: { target_id: string | null; title: string | null }) {
    const navigate = useNavigate();
    const navInfo = useCurrentNavigation();
    const navTo = useCallback(
        (target: string | null) => {
            const navTarget = (target && target === null) || target === "" ? "/" : `/${navInfo.return_id}`;
            console.log("navTarget: ", target);
            if (window.history?.length && window.history.length > 1) {
                navigate(-1);
             } else {
                navigate('/', { replace: true });
             }
            // navigate(navTarget);
        },
        [navigate]
    );
    return (
        <div className="flex items-center py-2 mr-2">
            {navInfo.return_id !== null && navInfo.return_id !== "" ? (
                <div
                    className="pr-4 hover:cursor-pointer"
                    onClick={() => {
                        navTo(navInfo.return_id);
                    }}
                >
                    <ArrowLeftIcon className="w-8 h-8" />
                </div>
            ) : undefined}
            <div className="text-2xl">{navInfo.title}</div>
        </div>
    );
}
