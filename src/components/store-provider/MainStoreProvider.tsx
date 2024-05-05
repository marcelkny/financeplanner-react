import { ReactNode } from "react";
import useSessionLoader from "./useSessionLoader";
import useSessionUpdater from "./useSessionUpdater";
import { SessionProvider } from "../../context/SessionContext";

function MainStoreProvider({ children }: { children: ReactNode }) {
    // logging and persisting
    const sessionUpdater = useSessionUpdater();

    // loading from persistet state or initializing
    const [initialSessionState, isLoadingSessionState] = useSessionLoader();

    // wait until the Stores are loaded,
    if (isLoadingSessionState) {
        return (
            <>
                <p>loading...</p>
            </>
        );
    }

    return (
        <SessionProvider afterActionTransformation={sessionUpdater} initialState={initialSessionState}>
            {children}
        </SessionProvider>
    );
}

export default MainStoreProvider;
