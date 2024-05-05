/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { GalleryKeyword, KeyData } from "../../../client/board-api";
import RoundedButton from "../../buttons/RoundedButton";
import { KeywordDict, initKeywordFunctions, removeA } from "../../../utils/gallery_utils/keywordChanger";

export default function GallerySearchSection({
    keyData,
    setNewKeys,
    startSearch,
}: {
    keyData: KeyData | undefined;
    setNewKeys: (array: string[]) => void;
    startSearch: MouseEventHandler<HTMLSpanElement>;
}) {
    // the Array containing all Keywords and information
    const [, setKeyDict] = useState<KeywordDict>({});

    // the Array containing all Keywords and information
    const [, setKeyArr] = useState<GalleryKeyword[]>([]);

    // the Array containing a array of all keyword strings
    const [srcArray, setSrcArray] = useState<string[]>([]);

    // the Array the keyword strings will be moved into
    const [destArray, setDestArray] = useState<string[]>([]);

    const [suggestArray, setSuggestArray] = useState<string[]>([]);

    const initKeyData = useCallback(async (keyData?: KeyData) => {
        if (!keyData) {
            return;
        }
        console.log("keyData: ", keyData);
        setKeyDict(keyData.dict);
        setKeyArr(keyData.arr);
        const srcTmpArray: string[] = await initKeywordFunctions(keyData.arr);
        setSrcArray(srcTmpArray);
    }, []);
    useEffect(() => {
        initKeyData(keyData);
    }, [keyData, initKeyData]);
    //
    const checkInputForKeywords = useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            const val = event.currentTarget.value;
            const suggestMaxSize = 10;
            let suggestCounter = 0;
            const sugArr: string[] = [];
            for (const key of srcArray) {
                if (val !== "" && suggestCounter < suggestMaxSize && key.startsWith(val)) {
                    if (!destArray.includes(key)) {
                        sugArr.push(key);
                        console.log("key: ", key);
                    }
                    suggestCounter++;
                }
            }
            setSuggestArray(sugArr);
            console.log("string in checkInputForKeywords: ", val);
        },
        [srcArray, destArray]
    );
    const setNewKeyword = useCallback(
        (value: string) => {
            console.log("setNewKeyword: ", value);
            value = value.toLowerCase();
            setSuggestArray([]);
            const tmptargetArr: string[] = destArray;
            if (!tmptargetArr.includes(value)) {
                tmptargetArr.push(value);
            }
            setNewKeys(tmptargetArr);
        },
        [destArray, setNewKeys]
    );
    
    useEffect(() => {
        setNewKeys(destArray);
    }, [destArray, setNewKeys]);

    const removeFromDestArray = useCallback(
        (value: string) => {
            const arr: string[] = [];
            for (const key of destArray) {
                if (key !== value) {
                    arr.push(key);
                }
            }
            setDestArray(arr);
        },
        [destArray]
    );
    return (
        <div>
            <div className="flex items-center gap-2">
                <input className="w-[200px]" type="text" name="tag_search" onChange={checkInputForKeywords} />
                <RoundedButton caption="Suchen" clickFunction={startSearch} />
            </div>

            {suggestArray.length <= 0 ? undefined : (
                <div className="w-fit bg-slate-800 absolute z-200 p-2">
                    <div className="flex flex-col gap-2">
                        {suggestArray.map((item: string, i: number) => (
                            <div
                                key={i}
                                className="text-gray-300 hover:cursor-pointer hover:text-gray-100"
                                onClick={() => {
                                    setNewKeyword(item);
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div>
                {destArray.length <= 0 ? undefined : (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {destArray.map((item: string, i: number) => (
                            <div
                                key={i}
                                className="bg-gray-300 px-2 rounded-sm hover:cursor-pointer"
                                onClick={() => {
                                    removeFromDestArray(item);
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {}
        </div>
    );
}
