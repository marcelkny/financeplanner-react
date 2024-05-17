import { useNavigate } from "react-router-dom";
import { useCurrentNavigation } from "../../context/NavigationContext";
import { useCallback } from "react";

export function HeaderBackNavigation({ target_id, title }: { target_id: string | null; title: string | null }) {
    const navigate = useNavigate();
    const navInfo = useCurrentNavigation();
    const navTo = useCallback(
        (target: string | null) => {
            const navTarget = target && target === null || target === "" ? "/" : `/${navInfo.return_id}`;
            console.log("navTarget: ", target);
            navigate(navTarget);
        },
        [navigate]
    );
    return (
        <div
            className="flex items-center py-2 mr-2 hover:cursor-pointer"
            onClick={() => {
                navTo(navInfo.return_id);
            }}
        >
            <div className="text-lg">{navInfo.title}</div>
        </div>
    );
}
