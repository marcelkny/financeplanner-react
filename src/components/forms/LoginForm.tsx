import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiLoginResponse, AuthenticationApi } from "../../client/board-api";
import { AppStatusSet, useAppContext } from "../../context/AppContext";
import { SessionSetUserSession, useSession } from "../../context/SessionContext";
import useBoardApiConfiguration from "../../hooks/useBoardApiConfiguration";
import { PasswordInput, TextInput } from "./input/Input";
import { FormButton } from "../buttons/FormButton";
import { TextLink } from "../text/TextLink";

export function LoginForm() {
    const [, dispatchAppState] = useAppContext();
    const [, dispatchSessionState] = useSession();
    const apiConfig = useBoardApiConfiguration();
    const navigate = useNavigate();

    // const [loginstate, setLogin] = useState(false);
    const [user, setUser] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const changeUser = (event: React.FormEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
    };
    const changePass = (event: React.FormEvent<HTMLInputElement>) => {
        setPass(event.currentTarget.value);
    };
    const Login = () => {
        new AuthenticationApi(apiConfig)
            .logintoAccount({ AccountCredentials: { emailaddress: user, password: pass } })
            .then((obj: ApiLoginResponse) => {
                console.log(obj);
                if (obj.code === 200) {
                    const sessionAction = SessionSetUserSession(obj.data.userInfo, obj.data.tokenInfo);
                    dispatchSessionState(sessionAction);

                }
                navigate("/");
            })
            .catch((err: unknown) => {
                console.error(err);
                console.error("damn");
                dispatchAppState(AppStatusSet("error", "Login fehlgeschlagen", "E-Mail-Adresse oder Passwort ist falsch", "/account/login"));
            });
    };
    return (
        <div className="w-1/2 md:w-fit mx-auto text-gray-300 pt-8">
            <div className="w-[95%] m-auto md:w-96 p-4 pb-8 border-1 border-solid border-stone-400 rounded bg-slate-800">
                <div>
                    <label htmlFor="username">E-Mail-Adresse:</label>
                </div>
                <div className="">
                    <TextInput placeholder="E-Mail-Adresse" className="Test" required={true} id="username" name="username" onChange={changeUser} />
                </div>
                <div>
                    <label htmlFor="password">Passwort:</label>
                </div>
                <div className="">
                    <PasswordInput placeholder="Passwort" className="Test" required={true} id="password" name="password" onChange={changePass} />
                </div>
                <div className="w-fit m-auto mt-8">
                    <FormButton onClick={Login} value={"Anmelden"} customStyle={"hover:cursor-pointer text-xl"} />
                </div>
            </div>
            <div className="w-fit m-auto pt-8 text-center">
                <TextLink caption={"Passwort vergessen?"} href={"/account/reset"} />
            </div>
        </div>
    );
}
