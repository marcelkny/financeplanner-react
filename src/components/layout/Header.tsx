import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentNavigation } from "../../context/NavigationContext";
import NavMenuWide from "../menues/NavMenuWide";
import { HeaderBackNavigation } from "./HeaderBackNavigation";

export default function Header() {
    const navInfo = useCurrentNavigation();

    return (
        <div className="bg-[rgb(15,15,30)] flex items-center text-gray-100 px-2 w-full">
            <HeaderBackNavigation target_id={navInfo.return_id} title={navInfo.title} />
        </div>
    );
}
