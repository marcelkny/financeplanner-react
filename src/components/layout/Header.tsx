import { useNavigate } from "react-router-dom";
import NavMenuWide from "../menues/NavMenuWide";

export default function Header() {
    const navigate = useNavigate();   
    
    return (
        <div className="bg-[rgb(15,15,30)] flex items-center text-gray-100 px-4">
            <div
                className="flex items-center px-2 py-2 mr-2 hover:cursor-pointer"
                onClick={() => {
                    navigate("/");
                }}
            >
                <div className="w-8 h-8">
                    <img src="/vite.svg" alt="" />
                </div>
                <div className="px-2 text-2xl">
                    Server<span className="font-semibold">Master</span>
                </div>
            </div>
            <NavMenuWide />
        </div>
    );
}
