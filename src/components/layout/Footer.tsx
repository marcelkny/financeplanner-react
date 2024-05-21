import { useCallback, useState } from "react";
import AddIcon from "../icons/AddIcon";
import { BottomSlideMenu } from "./BottomSlideMenu";
import { BottomSlideMenuItem } from "../../dtos/bottomslidemenu.dto";
import CurrencyEuroIcon from "../icons/CurrencyEuroIcon";
import { useIsLoggedIn } from "../../context/SessionContext";
import MenuIcon from "../icons/MenuIcon";

const slideMenuCenterItems: BottomSlideMenuItem[] = [
    {
        caption: "Neue Trannsaktion",
        funcionType: "nav",
        target: "/transaction/new",
    },
];

const slideMenuSettingItems: BottomSlideMenuItem[] = [
    {
        caption: "Settings",
        funcionType: "nav",
        target: "/settings",
    },
    {
        caption: "Logout",
        funcionType: "logout",
    },
];

export default function Footer() {
    const [menuActive, setMenuActive] = useState(false);
    const [slideMenuItems, setSlideMenuItems] = useState<BottomSlideMenuItem[]>([]);
    const isLoggedIn = useIsLoggedIn();
    const [currentItemsType, setCurrentItemsType] = useState<string>("");

    const toggleMenu = () => {
        console.log("should be: ", !menuActive);
        setMenuActive(!menuActive);
    };
    const setMenuItems = 
        (itemsType: string) => {
            console.log("setMenuItems: ", itemsType);
            console.log("currentItemsType: ", currentItemsType);
            switch (itemsType) {
                case "center":
                    setSlideMenuItems(slideMenuCenterItems);
                    break;
                case "setting":
                    setSlideMenuItems(slideMenuSettingItems);
                    break;
                default:
                    return;
            }
            if(itemsType === currentItemsType ) {
                toggleMenu();
            }
            setCurrentItemsType(itemsType);
            
        };
    return (
        <div className="bg-slate-900 h-16">
            {isLoggedIn === true ? (
                <div className="text-white px-2 py-2 grid grid-cols-12 gap-4 overflow-hidden h-16 w-full">
                    {menuActive === true ? <BottomSlideMenu toggleFunction={toggleMenu} menuItems={slideMenuItems} /> : undefined}

                    <div className="col-start-1 col-span-4 bg-green-300 w-full"></div>
                    <div
                        className="col-start-5 col-span-4 text-center p-2 rounded-lg bg-slate-700 hover:bg-slate-600 hover:cursor-pointer"
                        onClick={() => setMenuItems("center")}
                    >
                        <CurrencyEuroIcon dimensions={"w-8 h-8 mx-auto"} color={"white"} />
                    </div>
                    <div
                        className="col-start-9 col-span-4 text-center p-2 rounded-lg bg-slate-700 hover:bg-slate-600 hover:cursor-pointer"
                        onClick={() => setMenuItems("setting")}
                    >
                        <MenuIcon dimensions={"w-8 h-8 mx-auto"} color={"white"} />
                    </div>
                </div>
            ) : undefined}
        </div>
    );
}
