import React, { useCallback, useContext, useMemo, useReducer } from "react";
import { AlertVariant } from "../components/alerts/Alert";

export type AppStatusTypes = AlertVariant;

export interface AppStatusHref {
    target: string;
    caption: string;
}

export interface AppStatus {
    type: AppStatusTypes;
    title: string;
    message: string;
    key: string;
    href?: AppStatusHref;
}

export interface AppState {
    status?: AppStatus;
}

/**
 * Action Type for app update/set
 */
export interface AppStatusSetAction {
    type: "app.status.set";
    status: AppStatus;
}

/**
 * App Set Status Action constructor
 */
export function AppStatusSet(type: AppStatusTypes, title: string, message: string, key: string, href?: AppStatusHref): AppStatusSetAction {
    return {
        type: "app.status.set",
        status: {
            type,
            title,
            message,
            key,
            href,
        },
    };
}

/**
 * Action Type for app reset (f.e. force reload)
 */
export interface AppStatusResetAction {
    type: "app.status.reset";
}

/**
 * App Reset Action constructor
 */
export function AppStatusReset(): AppStatusResetAction {
    return {
        type: "app.status.reset",
    };
}

/**
 * App State changing Actions
 */
export type AppAction = AppStatusSetAction | AppStatusResetAction;

export type AppDispatch = (action: AppAction) => void;

/**
 * App Context Tuple
 *   - App Information
 *   - State Update Function
 */
export type AppContextType = [AppState, AppDispatch];

/**
 * Clean / Initial State
 */
const initialAppState: AppState = {
    status: undefined,
};

/**
 * App Context
 */
export const AppContext = React.createContext<AppContextType>([
    { ...initialAppState },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (): void => {},
]);

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "app.status.set":
            return {
                ...state,
                status: {
                    ...action.status,
                },
            };
        case "app.status.reset":
            return {
                ...state,
                status: undefined,
            };
        default:
            throw Error("Invalid State");
    }
}

/**
 * App Context Provider Properties
 */
export interface AppContextProviderProps {
    children: React.ReactNode;
    initialState?: AppState;
    beforeActionTransformation?: (state: AppState, action: AppAction) => AppState;
    afterActionTransformation?: (state: AppState, action: AppAction) => AppState;
}

/**
 * App Context Provider passing down the App Context (Tuple)
 */
export function AppContextProvider({ children, initialState, beforeActionTransformation, afterActionTransformation }: AppContextProviderProps): JSX.Element {
    const initial = useMemo(() => {
        return { ...(initialState !== undefined ? initialState : initialAppState) };
    }, [initialState]);

    const transformingReducer = useCallback(
        (state: AppState, action: AppAction): AppState => {
            let newState = state;
            if (beforeActionTransformation !== undefined) {
                newState = beforeActionTransformation(newState, action);
            }
            newState = appReducer(newState, action);
            if (afterActionTransformation !== undefined) {
                newState = afterActionTransformation(newState, action);
            }
            return newState;
        },
        [afterActionTransformation, beforeActionTransformation]
    );

    const [appInfo, dispatch] = useReducer(
        beforeActionTransformation !== undefined || afterActionTransformation !== undefined ? transformingReducer : appReducer,
        initial
    );
    return <AppContext.Provider value={[appInfo, dispatch]}>{children}</AppContext.Provider>;
}

/**
 * App Context Consumer (alias), same as AppContext.Consumer
 */
export const AppContextConsumer = AppContext.Consumer;

/**
 * Custom Hook for accessing the App Context
 */
export function useAppContext(): AppContextType {
    const context = useContext(AppContext);
    return context;
}

/**
 * Helper for checking Login State
 *
 * @export
 * @returns {Boolean}
 */
export function useGetCurrentAppContextKey(): string | undefined {
    const [state] = useAppContext();
    return state.status?.key;
}

export default AppContext;
