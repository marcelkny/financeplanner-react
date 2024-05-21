import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionReset, useIsLoggedIn, useSession } from "../../context/SessionContext";
import { authClear } from "../../utils/backend-auth";
import { BottomSlideMenuItem } from "../../dtos/bottomslidemenu.dto";

export function BottomSlideMenu({ toggleFunction, menuItems }: { toggleFunction: () => void; menuItems: BottomSlideMenuItem[] }) {
    const navigate = useNavigate();
    const [, dispatchSessionState] = useSession();

    const navTo = useCallback(
        (target: string) => {
            navigate(target);
        },
        [navigate]
    );

    const Logout = useCallback(async () => {
        const sessionAction = SessionReset();
        dispatchSessionState(sessionAction);
        await authClear();
        localStorage.clear();
        console.log("Logout()");
        navigate("/login");
    }, [dispatchSessionState, navigate]);

    const itemFunction = (item: BottomSlideMenuItem) => {
        switch (item.funcionType) {
            case "logout":
                return Logout();
            case "nav":
                return navTo(item.target || "/");
            default:
                return;
        }
    };

    return (
        <div className={`absolute bottom-16 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-[2px] ease-in duration-300`} onClick={toggleFunction}>
            <div className="absolute left-0 bottom-0 bg-slate-900 w-full rounded-t-lg <">
                <div className="flex flex-col gap-4 py-4 px-2">
                    {menuItems.map((item: BottomSlideMenuItem, key: number) => (
                        <div className="h-12 text-xl w-full bg-slate-700 hover:bg-slate-600 hover:cursor-pointer rounded-lg flex text-center items-center px-2" key={key} onClick={() => itemFunction(item)}>
                            <div className="w-fit mx-auto">{item.caption}</div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
