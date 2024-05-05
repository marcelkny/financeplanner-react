import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionReset, useIsLoggedIn, useSession } from "../../context/SessionContext";
import NavMenuButton from "../buttons/NavMenuButton";
import MenuIcon from "../icons/MenuIcon";

export default function NavMenuWide() {
    const navigate = useNavigate();
    const [, dispatchSessionState] = useSession();
    const isLoggedIn = useIsLoggedIn();
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(() => {
        setOpen(!open);
    }, [open]);
    const Logout = useCallback(() => {
        const sessionAction = SessionReset();
        dispatchSessionState(sessionAction);
        localStorage.clear();
        // new AccountApi(apiConfig).logoutofAccount().then(() => {
        //     navTo("/account/login");
        // });
        console.log("Logout()");
        navigate("/");
    }, [dispatchSessionState, navigate]);
    return (
        <div className="w-full flex justify-between">
            {isLoggedIn === true ? (
                <div className="flex items-center gap-4">
                    <NavMenuButton caption="Gallery" href="/gallery" />
                </div>
            ) : (
                <div></div>
            )}

            <div>
                {isLoggedIn === false ? (
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Login
                    </button>
                ) : (
                    <div>
                        <button onClick={handleOpen}>
                            <MenuIcon />
                        </button>
                        {open === true ? (
                            <div>
                                <div className="absolute text-2xl px-4 pt-4 pb-2 right-4 rounded-b-md overflow-hidden bg-[rgb(15,15,30)] z-50">
                                    <div>
                                        <button onClick={() => {
                                            navigate("/settings");
                                            handleOpen();
                                        }}>Einstellungen</button>
                                    </div>
                                    <div>
                                        <button onClick={()=>{
                                            Logout();
                                            handleOpen();
                                        }}>Logout</button>
                                    </div>
                                </div>

                                <div className="absolute top-0 left-0 w-screen h-screen" onClick={handleOpen}></div>
                            </div>
                        ) : undefined}
                    </div>
                )}
            </div>
        </div>
    );
}
