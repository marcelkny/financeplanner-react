import { useCallback } from "react";
import useContextUpdateLogger from "./useContextUpdateLogger";
import { SessionAction, SessionState } from "../../context/SessionContext";
import { removeLocalStoreItem, setLocalStoreItem } from "../../utils/LocalStorageHelper";
import { APP_LOCAL_STORAGE_SESSION_KEY } from "../../config/config";

export default function useSessionUpdater() {
    const sessionLogger = useContextUpdateLogger<SessionState, SessionAction>();

    const sessionStorer = useCallback(
        (state: SessionState, action: SessionAction): SessionState => {
            const result = sessionLogger(state, action);
            if (action.type === "session.userinfo.set") {
                setLocalStoreItem(APP_LOCAL_STORAGE_SESSION_KEY, JSON.stringify(state));
            } else if (action.type === "session.reset") {
                removeLocalStoreItem(APP_LOCAL_STORAGE_SESSION_KEY);
            }
            return result;
        },
        [sessionLogger]
    );

    return sessionStorer;
}
