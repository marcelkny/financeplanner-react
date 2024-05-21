/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import RoundedButton from "../../components/buttons/RoundedButton";
import { useSession } from "../../context/SessionContext";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";

export default function SettingsView() {
    const [pass1, setPass1] = useState<string>("");
    const [pass2, setPass2] = useState<string>("");
    const [passWasChanged, setPassWasChanged] = useState<boolean>(false);
    const [, dispatchNavInfo] = useNavigationContext();

    const reloadCallback = useCallback(() => {
        const navAction = NavigationSetUserNavigation({ id: "settings", title: "Einstellungen", return_id: "home" });
        dispatchNavInfo(navAction);
        // console.log("reloadCallback()");
    }, []);
    useEffect(() => {
        reloadCallback();
    }, [reloadCallback]);

    const changePass1 = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        setPass1(event.currentTarget.value);

        if (pass1 === pass2) {
            setPassWasChanged(true);
        }
    };
    const changePass2 = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        setPass2(event.currentTarget.value);

        if (pass1 === pass2) {
            setPassWasChanged(true);
        }
    };
    return (
        <div className="w-3/4 py-4 mx-auto flex flex-col gap-4 text-gray-200">
            <hr className="my-6" />
            <div className="flex flex-col gap-4">
                <div>
                    <div>
                        <label htmlFor="">Passwort:</label>
                    </div>
                    <div>
                        <input type="password" className="text-black px-2" onChange={changePass1} />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="">Passwort wiederholen:</label>
                    </div>
                    <div>
                        <input type="password" className="text-black px-2" onChange={changePass2} />
                    </div>
                </div>
            </div>
        </div>
    );
}
