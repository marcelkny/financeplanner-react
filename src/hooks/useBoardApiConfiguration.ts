import { useMemo } from "react";
import { Configuration } from "../client/board-api/";
import getBoardApiConfiguration, { ConfigurationParametersHook } from "../utils/board-api.config";
import { useSession } from "../context/SessionContext";

/**
 * return an Board (API) Client Configuration based on current session and (dynamic) configuration context
 *
 * @returns board client config
 */
export default function useBoardApiConfiguration(configHook?: ConfigurationParametersHook): Configuration {
    const [session] = useSession();
    const token = session.tokenInfo?.token ?? "";
    const user = session.userInfo?.username ?? "";
    const memo = useMemo(() => {
        return getBoardApiConfiguration({ accessToken: token, username: user }, configHook);
    }, [token, user, configHook]);
    return memo;
}
