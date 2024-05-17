import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePageButton({ caption, href }: { caption: string; href: string }) {
    const navigate = useNavigate();
    const navTo = useCallback(
        (target: string) => {
            navigate(target);
        },
        [navigate]
    );
    return (
        <div
            className="mx-auto w-full bg-slate-600 rounded-xl py-2 px-4 text-center text-gray-200  hover:cursor-pointer hover:bg-slate-400 hover:text-black"
            onClick={() => {
                navTo(href);
            }}
        >
            <button className="text-xl">{caption}</button>
        </div>
    );
}
