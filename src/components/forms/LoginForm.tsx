import bcrypt from "bcryptjs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionSetUserSession, useSession } from "../../context/SessionContext";
import UserRepository from "../../repositories/user.repository";
import { FormButton } from "../buttons/FormButton";
import { PasswordInput, TextInput } from "./input/Input";
import { dispatchNavigationInfo } from "../../utils/dispatchNavigationInfo";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";
import { LoadingSetLoadingScreen, useLoadingContext } from "../../context/LoadingContext";
import { error } from "console";

export function LoginForm() {
    const [, dispatchSessionState] = useSession();
    const [loadingContext, dispatchIsLoading] = useLoadingContext();
    const navigate = useNavigate();

    // const [loginstate, setLogin] = useState(false);
    const [user, setUser] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [, dispatchNavInfo] = useNavigationContext();
    const navigationCallback = useCallback(() => {
        const navAction = NavigationSetUserNavigation({ id: "login", title: "Login", return_id: null });
        dispatchNavInfo(navAction);
        const isLoadingPrepare = LoadingSetLoadingScreen({ isLoading: false });
        dispatchIsLoading(isLoadingPrepare);
    }, [dispatchNavigationInfo]);
    useEffect(() => {
        navigationCallback();
    }, [navigationCallback]);
    const changeUser = (event: React.FormEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
    };
    const changePass = (event: React.FormEvent<HTMLInputElement>) => {
        setPass(event.currentTarget.value);
    };
    const Login = async () => {
        new UserRepository()
            .getUserByEmail(user)
            .then((authResult) => {
                console.log("user: ", authResult)
                const userResult = authResult[0];
                const token = authResult[1];
                const password = userResult.password;
                if (bcrypt.compareSync(pass, password) === true) {
                    const userInfo = { user_id: userResult.id, username: userResult.name, mail: user };
                    const tokenInfo = { token: token };
                    const sessionAction = SessionSetUserSession(userInfo, tokenInfo);
                    dispatchSessionState(sessionAction);
                    // setLogin(true);
                    navigate("/");
                } else {
                    throw new Error("Authentication failed")
                }
            })
            .catch((error: Error) => {
                console.error(error);
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
            {/* <div className="w-fit m-auto pt-8 text-center">
                <TextLink caption={"Passwort vergessen?"} href={"/account/reset"} />
            </div> */}
        </div>
    );
}
