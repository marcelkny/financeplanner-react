/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext, useMemo, useReducer } from "react";

/**
 * User Info Type
 */
export interface SessionUserInfo {
    user_id: string;
    username: string;
    mail: string;
}

/**
 * Session Token Info Type
 */
export interface SessionTokenInfo {
    token: string;
}

export interface SessionState {
    // Session Token for the case that we are logged in or not
    tokenInfo: SessionTokenInfo | null;
    // User Info
    userInfo: SessionUserInfo;
}

/**
 * Action Type for setting UserInfo (Login)
 */
export interface SessionSetUserInfoAction {
    type: "session.userinfo.set";
    userInfo: SessionUserInfo;
    tokenInfo: SessionTokenInfo;
}

/**
 * API Login Action constructor
 */
export function SessionSetUserSession(userInfo: SessionUserInfo, tokenInfo: SessionTokenInfo): SessionSetUserInfoAction {
    return {
        type: "session.userinfo.set",
        userInfo,
        tokenInfo,
    };
}

/**
 * Action Type for session reset (Logout)
 */
export interface SessionResetAction {
    type: "session.reset";
}

/**
 * Session Reset Action constructor
 */
export function SessionReset(): SessionResetAction {
    return {
        type: "session.reset",
    };
}

/**
 * Session State changing Actions
 */
export type SessionAction = SessionSetUserInfoAction | SessionResetAction;

export type SessionDispatch = (action: SessionAction) => void;

/**
 * Session Context Tuple
 *   - Session Information
 *   - State Update Function
 */
export type SessionContextType = [SessionState, SessionDispatch];

/**
 * Clean / Initial State
 */
export const initialSessionState: SessionState = {
    tokenInfo: null,
    userInfo: {
        user_id: "",
        username: "",
        mail: "",
    },
};

/**
 * Session Context
 */
export const SessionContext = React.createContext<SessionContextType>([
    { ...initialSessionState },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (): void => {},
]);

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
    switch (action.type) {
        case "session.userinfo.set":
            return {
                ...state,
                userInfo: {
                    ...action.userInfo,
                },
                tokenInfo: {
                    ...action.tokenInfo,
                },
            };
        case "session.reset":
            return {
                ...initialSessionState,
            };
        default:
            throw Error("Invalid State");
    }
}

/**
 * Session Context Provider Properties
 */
export interface SessionProviderProps {
    children: React.ReactNode;
    initialState?: SessionState;
    beforeActionTransformation?: (state: SessionState, action: SessionAction) => SessionState;
    afterActionTransformation?: (state: SessionState, action: SessionAction) => SessionState;
}

/**
 * Session Context Provider passing down the Session Context (Tuple)
 */
export function SessionProvider({ children, initialState, beforeActionTransformation, afterActionTransformation }: SessionProviderProps): JSX.Element {
    const initial = useMemo(() => {
        return { ...(initialState !== undefined ? initialState : initialSessionState) };
    }, [initialState]);

    const transformingReducer = useCallback(
        (state: SessionState, action: SessionAction): SessionState => {
            let newState = state;
            if (beforeActionTransformation !== undefined) {
                newState = beforeActionTransformation(newState, action);
            }
            newState = sessionReducer(newState, action);
            if (afterActionTransformation !== undefined) {
                newState = afterActionTransformation(newState, action);
            }
            return newState;
        },
        [beforeActionTransformation, afterActionTransformation]
    );

    const [sessionInfo, dispatch] = useReducer(transformingReducer, initial);
    return <SessionContext.Provider value={[sessionInfo, dispatch]}>{children}</SessionContext.Provider>;
}

/**
 * Session Context Consumer (alias), same as SessionContext.Consumer
 */
export const SessionConsumer = SessionContext.Consumer;

/**
 * Custom Hook for accessing the Language Context
 */
export function useSession(): SessionContextType {
    const context = useContext(SessionContext);
    return context;
}

/**
 * Helper for checking Login State
 *
 * @export
 * @returns {Boolean}
 */
export function useIsLoggedIn(): boolean {
    const [state] = useSession();

    return state.tokenInfo !== null;
}

export default SessionContext;
