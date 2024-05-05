import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppStatusReset, useAppContext } from "./AppContext";

export interface AppContextProviderProps {
    children: React.ReactNode;
}

export function AppstateSwitch({ children }: AppContextProviderProps) {
    const location = useLocation();
    const [state, disp] = useAppContext();

    useEffect(() => {
        if (state.status !== undefined) {
            if (location.pathname !== state.status?.key) {
                disp(AppStatusReset());
            }
        }
    }, [location, state, disp]);

    return <div>{children}</div>;
}
