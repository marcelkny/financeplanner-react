/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useCallback } from "react";
import { APP_LOG_CONTEXT_UPDATES } from "../../config/config";

type StateTransformation<S, A> = (state: S, action: A) => S;

export default function useContextUpdateLogger<S extends {}, A extends {}>(): StateTransformation<S, A> {
    return useCallback((state: S, action: A): S => {
        if (APP_LOG_CONTEXT_UPDATES) {
            if ("type" in action) {
                console.log("Received action: ", (action as any).type);
            }
            console.log("  -> New State: ", state);
        }
        return state;
    }, []);
}
