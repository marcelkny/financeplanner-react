import type { SessionStoreState } from "../dtos/sessionstorestate.dto";

const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number => typeof value === "number";
const isNull = (value: unknown): value is null => value === null;
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isUnion =
    (unionChecks: ((value: unknown) => boolean)[]) =>
    (value: unknown): boolean =>
        unionChecks.reduce((s: boolean, isT) => s || isT(value), false);

export const isSessionStoreState = (arg_0: unknown): arg_0 is SessionStoreState =>
    isObject(arg_0) &&
    "tokenInfo" in arg_0 &&
    ((arg_1: unknown): boolean =>
        isUnion([
            isNull,
            (arg_2: unknown): boolean =>
                isObject(arg_2) &&
                "timestamp" in arg_2 &&
                isString(arg_2["timestamp"]) &&
                "expiration" in arg_2 &&
                isString(arg_2["expiration"]) &&
                "token" in arg_2 &&
                isString(arg_2["token"]) &&
                "jwt" in arg_2 &&
                isString(arg_2["jwt"]),
        ])(arg_1))(arg_0["tokenInfo"]) &&
    "userInfo" in arg_0 &&
    ((arg_1: unknown): boolean =>
        isObject(arg_1) &&
        "user_id" in arg_1 &&
        isString(arg_1["user_id"]) &&
        "username" in arg_1 &&
        isString(arg_1["username"]) &&
        "mail" in arg_1 &&
        isString(arg_1["mail"]) &&
        "config" in arg_1 &&
        isString(arg_1["config"]) &&
        "userContentLevel" in arg_1 &&
        isNumber(arg_1["userContentLevel"]) &&
        "maxContentLevel" in arg_1 &&
        isNumber(arg_1["maxContentLevel"]))(arg_0["userInfo"]);
