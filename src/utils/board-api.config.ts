import { Configuration, ConfigurationParameters } from "../client/board-api";
import { APP_CONFIGURATION } from "../config/_generated";

export interface ExtendedConfiguration extends ConfigurationParameters {
    api_url?: string;
}

export type ConfigurationParametersHook = (config: ConfigurationParameters) => ConfigurationParameters;

export default function getBoardApiConfiguration({ api_url, ...rest }: ExtendedConfiguration = {}, configHook?: ConfigurationParametersHook): Configuration {
    const newConfigParams = {
        ...rest,
    };

    // build config params
    const params = {
        ...newConfigParams,
        basePath: api_url ? api_url.replace(/\/$/, "") : APP_CONFIGURATION.HOST_URL.replace(/\/$/, ""),
    };
    return new Configuration(configHook ? configHook(params) : params);
}
