import type { BottomSlideMenuItem } from "./../dtos/bottomslidemenu.dto";
import type { SessionStoreState } from "./../dtos/sessionstorestate.dto";

const isString = (value: unknown): value is string => typeof value === "string";
const isUndefined = (value: unknown): value is undefined => typeof value === "undefined";
const isNull = (value: unknown): value is null => value === null;
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isUnion =
    (unionChecks: ((value: unknown) => boolean)[]) =>
    (value: unknown): boolean =>
        unionChecks.reduce((s: boolean, isT) => s || isT(value), false);

export const isBottomSlideMenuItem = (arg_0: unknown): arg_0 is BottomSlideMenuItem =>
    isObject(arg_0) &&
    "caption" in arg_0 &&
    isString(arg_0["caption"]) &&
    "funcionType" in arg_0 &&
    ((arg_1: unknown): boolean => isUnion([(arg_2: unknown): boolean => arg_2 === "nav", (arg_2: unknown): boolean => arg_2 === "logout"])(arg_1))(
        arg_0["funcionType"]
    ) &&
    ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0["target"]);

export const isSessionStoreState = (arg_0: unknown): arg_0 is SessionStoreState =>
    isObject(arg_0) &&
    "tokenInfo" in arg_0 &&
    ((arg_1: unknown): boolean => isUnion([isNull, (arg_2: unknown): boolean => isObject(arg_2) && "token" in arg_2 && isString(arg_2["token"])])(arg_1))(
        arg_0["tokenInfo"]
    ) &&
    "userInfo" in arg_0 &&
    ((arg_1: unknown): boolean =>
        isObject(arg_1) &&
        "user_id" in arg_1 &&
        isString(arg_1["user_id"]) &&
        "username" in arg_1 &&
        isString(arg_1["username"]) &&
        "mail" in arg_1 &&
        isString(arg_1["mail"]))(arg_0["userInfo"]);
