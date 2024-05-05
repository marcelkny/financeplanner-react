/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { APP_LOCAL_STORAGE_SESSION_KEY } from "../../config/config";
import { SessionState } from "../../context/SessionContext";
import { getLocalStoreItem, removeLocalStoreItem } from "../../utils/LocalStorageHelper";
import { isSessionStoreState } from "../../utils/dto-predicates";

export default function useSessionLoader(): [SessionState | undefined, boolean] {
    // load initial state from store and update
    const [state, updateState] = useState<SessionState | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const json = getLocalStoreItem(APP_LOCAL_STORAGE_SESSION_KEY);
        if (json) {
            const data: SessionState = JSON.parse(json);
            // check that data is at least a valid supertype of SessionState
            if (isSessionStoreState(data)) {
                console.log("restoring session from local storage");
                // copy the needed parts
                updateState(data);
                setLoading(false);
                return;
            }
        }
        if (json !== null) {
            console.log("could not restore session from local storage, reinitializing session");
            removeLocalStoreItem(APP_LOCAL_STORAGE_SESSION_KEY);
        }
        setLoading(false);
    }, []);

    return [state, loading];
}
