import React, { useCallback, useContext, useMemo, useReducer } from "react";

/**
 * User Info Type
 */
export interface NavigationInfo {
    id: string | null;
    title: string | null;
    return_id: string | null;
}


export interface NavigationState {
    // User Info
    navigationInfo: NavigationInfo;
}

/**
 * Action Type for setting navigationInfo (Login)
 */
export interface NavigationSetnavigationInfoAction {
    type: "Navigation.navigationInfo.set";
    navigationInfo: NavigationInfo;
}

/**
 * API Login Action constructor
 */
export function NavigationSetUserNavigation(navigationInfo: NavigationInfo): NavigationSetnavigationInfoAction {
    return {
        type: "Navigation.navigationInfo.set",
        navigationInfo,
    };
}

/**
 * Action Type for Navigation reset (Logout)
 */
export interface NavigationResetAction {
    type: "Navigation.reset";
}

/**
 * Navigation Reset Action constructor
 */
export function NavigationReset(): NavigationResetAction {
    return {
        type: "Navigation.reset",
    };
}

/**
 * Navigation State changing Actions
 */
export type NavigationAction = NavigationSetnavigationInfoAction | NavigationResetAction;

export type NavigationDispatch = (action: NavigationAction) => void;

/**
 * Navigation Context Tuple
 *   - Navigation Information
 *   - State Update Function
 */
export type NavigationContextType = [NavigationState, NavigationDispatch];

/**
 * Clean / Initial State
 */
export const initialNavigationState: NavigationState = {
    navigationInfo: {
        id: null,
        title: null,
        return_id: null,
    },
};

/**
 * Navigation Context
 */
export const NavigationContext = React.createContext<NavigationContextType>([
    { ...initialNavigationState },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (): void => {},
]);

function NavigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
    switch (action.type) {
        case "Navigation.navigationInfo.set":
            return {
                ...state,
                navigationInfo: {
                    ...action.navigationInfo,
                },
            };
        case "Navigation.reset":
            return {
                ...initialNavigationState,
            };
        default:
            throw Error("Invalid State");
    }
}

/**
 * Navigation Context Provider Properties
 */
export interface NavigationProviderProps {
    children: React.ReactNode;
    initialState?: NavigationState;
    beforeActionTransformation?: (state: NavigationState, action: NavigationAction) => NavigationState;
    afterActionTransformation?: (state: NavigationState, action: NavigationAction) => NavigationState;
}

/**
 * Navigation Context Provider passing down the Navigation Context (Tuple)
 */
export function NavigationProvider({ children, initialState, beforeActionTransformation, afterActionTransformation }: NavigationProviderProps): JSX.Element {
    const initial = useMemo(() => {
        return { ...(initialState !== undefined ? initialState : initialNavigationState) };
    }, [initialState]);

    const transformingReducer = useCallback(
        (state: NavigationState, action: NavigationAction): NavigationState => {
            let newState = state;
            if (beforeActionTransformation !== undefined) {
                newState = beforeActionTransformation(newState, action);
            }
            newState = NavigationReducer(newState, action);
            if (afterActionTransformation !== undefined) {
                newState = afterActionTransformation(newState, action);
            }
            return newState;
        },
        [beforeActionTransformation, afterActionTransformation]
    );

    const [NavigationInfo, dispatch] = useReducer(transformingReducer, initial);
    return <NavigationContext.Provider value={[NavigationInfo, dispatch]}>{children}</NavigationContext.Provider>;
}

/**
 * Navigation Context Consumer (alias), same as NavigationContext.Consumer
 */
export const NavigationConsumer = NavigationContext.Consumer;

/**
 * Custom Hook for accessing the Language Context
 */
export function useNavigationContext(): NavigationContextType {
    const context = useContext(NavigationContext);
    return context;
}
export function useCurrentNavigation(): NavigationInfo {
    const [state] = useNavigationContext();
    return state.navigationInfo;
}
/**
 * Helper for checking Login State
 *
 * @export
 * @returns {Boolean}
 */
export function useIsLoggedIn(): Boolean {
    const [state] = useNavigationContext();
    return state.navigationInfo.title !== null;
}

export default NavigationContext;
