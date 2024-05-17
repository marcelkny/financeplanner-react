import type { DepositModel, DepositModelArray } from "./../models/deposit.model";
import type { TransactionViewModel, TransactionViewModelArray } from "./../models/transactionview.model";
import type { UserModel, UserModelArray } from "./../models/user.model";

const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number => typeof value === "number";
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
type ArrayCheckOption = "all" | "first";
const isArray =
    <T>(childCheckFn: ((value: unknown) => value is T) | ((value: unknown) => boolean), checkOption: ArrayCheckOption = "all") =>
    (array: unknown): boolean =>
        Array.isArray(array) &&
        (checkOption === "all"
            ? ((array) => {
                  for (const val of array) {
                      if (!childCheckFn(val)) return false;
                  }
                  return true;
              })(array)
            : typeof array[0] === "undefined" || childCheckFn(array[0]));

export const isDepositModel = (arg_0: unknown): arg_0 is DepositModel =>
    isObject(arg_0) &&
    "collectionId" in arg_0 &&
    isString(arg_0["collectionId"]) &&
    "collectionName" in arg_0 &&
    isString(arg_0["collectionName"]) &&
    "created" in arg_0 &&
    isString(arg_0["created"]) &&
    "id" in arg_0 &&
    isString(arg_0["id"]) &&
    "name" in arg_0 &&
    isString(arg_0["name"]) &&
    "note" in arg_0 &&
    isString(arg_0["note"]) &&
    "updated" in arg_0 &&
    isString(arg_0["updated"]) &&
    "user_id" in arg_0 &&
    isString(arg_0["user_id"]);

export const isDepositModelArray = (arg_0: unknown, checkOpt: ArrayCheckOption = "all"): arg_0 is DepositModelArray => isArray(isDepositModel, checkOpt)(arg_0);

export const isTransactionViewModel = (arg_0: unknown): arg_0 is TransactionViewModel =>
    isObject(arg_0) &&
    "id" in arg_0 &&
    isString(arg_0["id"]) &&
    "amount" in arg_0 &&
    isNumber(arg_0["amount"]) &&
    "date" in arg_0 &&
    isString(arg_0["date"]) &&
    "note" in arg_0 &&
    isString(arg_0["note"]) &&
    "deposit_id" in arg_0 &&
    isString(arg_0["deposit_id"]) &&
    "category_id" in arg_0 &&
    isString(arg_0["category_id"]) &&
    "category_name" in arg_0 &&
    isString(arg_0["category_name"]) &&
    "type_id" in arg_0 &&
    isString(arg_0["type_id"]) &&
    "type_name" in arg_0 &&
    isString(arg_0["type_name"]) &&
    "user_id" in arg_0 &&
    isString(arg_0["user_id"]) &&
    "collectionId" in arg_0 &&
    isString(arg_0["collectionId"]) &&
    "collectionName" in arg_0 &&
    isString(arg_0["collectionName"]) &&
    "created" in arg_0 &&
    isString(arg_0["created"]);

export const isTransactionViewModelArray = (arg_0: unknown, checkOpt: ArrayCheckOption = "all"): arg_0 is TransactionViewModelArray =>
    isArray(isTransactionViewModel, checkOpt)(arg_0);

export const isUserModel = (arg_0: unknown): arg_0 is UserModel =>
    isObject(arg_0) &&
    "collectionId" in arg_0 &&
    isString(arg_0["collectionId"]) &&
    "collectionName" in arg_0 &&
    isString(arg_0["collectionName"]) &&
    "created" in arg_0 &&
    isString(arg_0["created"]) &&
    "email" in arg_0 &&
    isString(arg_0["email"]) &&
    "id" in arg_0 &&
    isString(arg_0["id"]) &&
    "name" in arg_0 &&
    isString(arg_0["name"]) &&
    "password" in arg_0 &&
    isString(arg_0["password"]) &&
    "token" in arg_0 &&
    isString(arg_0["token"]) &&
    "updated" in arg_0 &&
    isString(arg_0["updated"]);

export const isUserModelArray = (arg_0: unknown, checkOpt: ArrayCheckOption = "all"): arg_0 is UserModelArray => isArray(isUserModel, checkOpt)(arg_0);
