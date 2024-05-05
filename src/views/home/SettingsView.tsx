/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { AuthenticationApi, ContentLevelItem, SettingsPageContentResponse } from "../../client/board-api";
import RoundedButton from "../../components/buttons/RoundedButton";
import { useSession } from "../../context/SessionContext";
import useBoardApiConfiguration from "../../hooks/useBoardApiConfiguration";

export default function SettingsView() {
    const [session] = useSession();
    const apiConfig = useBoardApiConfiguration();
    const [curContentLevel, setCurContentLevel] = useState<number>();
    const [contentLevels, setContentLevels] = useState<ContentLevelItem[]>();
    const [pass1, setPass1] = useState<string>("");
    const [pass2, setPass2] = useState<string>("");
    const [contentLevelWasChanged, setContentLevelWasChanged] = useState<boolean>(false);
    const [passWasChanged, setPassWasChanged] = useState<boolean>(false);

    const reloadCallback = useCallback(() => {
        new AuthenticationApi(apiConfig)
            .getSettingsContents({ SettingsPageContentRequest: { user_id: session.userInfo.user_id } })
            .then(async (obj: SettingsPageContentResponse) => {
                setContentLevels(obj.data);
            });
    }, [apiConfig, session]);
    useEffect(() => {
        reloadCallback();
    }, [reloadCallback]);

    const setContentLevel = useCallback((value: number) => {
        console.log("setContentLevel() ", value);
        setCurContentLevel(value);
        setContentLevelWasChanged(true);
    }, []);
    const saveContentLevel = useCallback(() => {
        console.log("saveContentLevel()");
    }, []);

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
            {contentLevels ? (
                <div>
                    <div>
                        <label htmlFor="">ContentLevel:</label>
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            className="text-black px-2"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setContentLevel(parseInt(e.target.value));
                            }}
                        >
                            {contentLevels.map((item: ContentLevelItem, i: number) => (
                                <option key={i} value={item.id}>
                                    {item.contentlevelname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-12">
                        <RoundedButton caption="ContentLevel speichern" additionalClass="text-2xl" clickFunction={saveContentLevel} />
                    </div>
                </div>
            ) : undefined}

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
                <div className="mt-8">
                    <RoundedButton caption="ContentLevel speichern" additionalClass="text-2xl" clickFunction={saveContentLevel} />
                </div>
            </div>
        </div>
    );
}
