import React, { useCallback, useContext, useMemo, useReducer } from "react";

export interface LoadingInfo {
    // User Info
    isLoading: boolean;
}

/**
 * Action Type for setting navigationInfo (Login)
 */
export interface LoadingSetnavigationInfoAction {
    type: "Loading.navigationInfo.set";
    navigationInfo: LoadingInfo;
}

/**
 * API Login Action constructor
 */
export function LoadingSetLoadingScreen(navigationInfo: LoadingInfo): LoadingSetnavigationInfoAction {
    return {
        type: "Loading.navigationInfo.set",
        navigationInfo,
    };
}

/**
 * Action Type for Loading reset (Logout)
 */
export interface LoadingResetAction {
    type: "Loading.reset";
}

/**
 * Loading Reset Action constructor
 */
export function LoadingReset(): LoadingResetAction {
    return {
        type: "Loading.reset",
    };
}

/**
 * Loading State changing Actions
 */
export type LoadingAction = LoadingSetnavigationInfoAction | LoadingResetAction;

export type LoadingDispatch = (action: LoadingAction) => void;

/**
 * Loading Context Tuple
 *   - Loading Information
 *   - State Update Function
 */
export type LoadingContextType = [LoadingInfo, LoadingDispatch];

/**
 * Clean / Initial State
 */
export const initialLoadingInfo: LoadingInfo = {
        isLoading: true
};

/**
 * Loading Context
 */
export const LoadingContext = React.createContext<LoadingContextType>([
    { ...initialLoadingInfo },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (): void => {},
]);

function LoadingReducer(state: LoadingInfo, action: LoadingAction): LoadingInfo {
    switch (action.type) {
        case "Loading.navigationInfo.set":
            return {
                ...state,
                    ...action.navigationInfo,
            };
        case "Loading.reset":
            return {
                ...initialLoadingInfo,
            };
        default:
            throw Error("Invalid State");
    }
}

/**
 * Loading Context Provider Properties
 */
export interface LoadingProviderProps {
    children: React.ReactNode;
    initialState?: LoadingInfo;
    beforeActionTransformation?: (state: LoadingInfo, action: LoadingAction) => LoadingInfo;
    afterActionTransformation?: (state: LoadingInfo, action: LoadingAction) => LoadingInfo;
}

/**
 * Loading Context Provider passing down the Loading Context (Tuple)
 */
export function LoadingProvider({ children, initialState, beforeActionTransformation, afterActionTransformation }: LoadingProviderProps): JSX.Element {
    const initial = useMemo(() => {
        return { ...(initialState !== undefined ? initialState : initialLoadingInfo) };
    }, [initialState]);

    const transformingReducer = useCallback(
        (state: LoadingInfo, action: LoadingAction): LoadingInfo => {
            let newState = state;
            if (beforeActionTransformation !== undefined) {
                newState = beforeActionTransformation(newState, action);
            }
            newState = LoadingReducer(newState, action);
            if (afterActionTransformation !== undefined) {
                newState = afterActionTransformation(newState, action);
            }
            return newState;
        },
        [beforeActionTransformation, afterActionTransformation]
    );

    const [LoadingInfo, dispatch] = useReducer(transformingReducer, initial);
    return <LoadingContext.Provider value={[LoadingInfo, dispatch]}>{children}</LoadingContext.Provider>;
}

/**
 * Loading Context Consumer (alias), same as LoadingContext.Consumer
 */
export const LoadingConsumer = LoadingContext.Consumer;

/**
 * Custom Hook for accessing the Language Context
 */
export function useLoadingContext(): LoadingContextType {
    const context = useContext(LoadingContext);
    return context;
}

/**
 * Helper for checking Login State
 *
 * @export
 * @returns {Boolean}
 */
export function useIsLoading(): Boolean {
    const [state] = useLoadingContext();
    return state.isLoading ?? false;
}

export default LoadingContext;
