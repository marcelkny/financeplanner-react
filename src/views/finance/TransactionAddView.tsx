import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { LoadingSetLoadingScreen, useLoadingContext } from "../../context/LoadingContext";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";
import { useSession } from "../../context/SessionContext";
import { ExpenseCategoryModelArray } from "../../models/category.model";
import { DepositModelArray } from "../../models/deposit.model";
import { ExpenseTypeModel, ExpenseTypeModelArray } from "../../models/type.model";
import DepositRepository from "../../repositories/deposit.repository";
import ExpenseCategoryRepository from "../../repositories/expensecategory.repository";
import ExpenseTypeRepository from "../../repositories/expensetype.repository";
import { ExpenseTypeSelector } from "../../components/forms/select/expensetypeselector";

export function TransactionAddView() {
    const [session] = useSession();
    const [, dispatchNavInfo] = useNavigationContext();
    const [loadingContext, dispatchIsLoading] = useLoadingContext();

    const [expenseExpenseCategories, setExpenseExpenseCategories] = useState<ExpenseCategoryModelArray>([]);
    const [expenseExpenseTypes, setExpenseExpenseTypes] = useState<ExpenseTypeModelArray>([]);

    // it it's not an expense, it's an income
    const [isExpense, setIsExpense] = useState<boolean>(true);
    const [transactionValue, setTransactionValue] = useState<string>("");
    const [transactionDate, setTransactionDate] = useState<string>("");
    const [transactionNote, setTransactionNote] = useState<string>("");

    const initCallback = useCallback(async () => {
        const navAction = NavigationSetUserNavigation({ id: "transaction_new", title: "Neue Transaktion", return_id: "/transactions" });
        dispatchNavInfo(navAction);
        await new ExpenseCategoryRepository()
            .getExpenseCategories()
            .then((result: ExpenseCategoryModelArray) => {
                console.log("expensecategory result: ", result);
                setExpenseExpenseCategories(result);
            })
            .catch((err) => {
                console.error("error: ", err);
                return;
            });
        await new ExpenseTypeRepository()
            .getExpenseTypes()
            .then((result: ExpenseTypeModelArray) => {
                console.log("expensetype result: ", result);
                setExpenseExpenseTypes(result);
            })
            .catch((err) => {
                console.error("error: ", err);
                return;
            });

        await new DepositRepository().getDeposits(session.userInfo.user_id).then((result: DepositModelArray) => {
            console.log("deposit result: ", result);
        });

        const isLoadingPrepare = LoadingSetLoadingScreen({ isLoading: false });
        dispatchIsLoading(isLoadingPrepare);
    }, []);
    useEffect(() => {
        initCallback();
    }, [initCallback]);

    // load the types from DB
    const loadExpenseTypes = useCallback(() => {
        return;
    }, []);
    useEffect(() => {
        loadExpenseTypes();
    }, [loadExpenseTypes]);

    const changeExpenseOrIncome = useCallback(() => {
        setIsExpense(!isExpense);
    }, [setIsExpense, isExpense]);
    const changeValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            console.log("changeValue value: ", event.target.value);
            setTransactionValue(event.target.value);
        },
        [setTransactionValue]
    );
    const changeDate = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            console.log("changeDate value: ", event.target.value);
            console.log("changeDate DATE: ", new Date(event.target.value));
            setTransactionDate(event.target.value);
        },
        [setTransactionDate]
    );
    const changeNote = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            console.log("changeNote value: ", event.target.value);
            setTransactionNote(event.target.value);
        },
        [setTransactionNote]
    );

    const saveChanges = useCallback(() => {
        console.log("saveChanges: ", transactionNote, transactionValue);
        const newTransacion = {
            name: transactionNote,
            value: parseFloat(transactionValue).toFixed(2),
            date: new Date(transactionDate),
        };
    }, [transactionNote, transactionValue]);

    return (
        <div className="pt-8 text-black text-xl">
            <div className="flex flex-col gap-4">
                <div>
                    <div className="grid grid-cols-2 mx-2 bg-gray-400 rounded-lg overflow-hidden hover:cursor-pointer" onClick={changeExpenseOrIncome}>
                        <div className={isExpense === true ? "text-left py-2 px-4 bg-red-500 ease-in duration-100" : "text-left py-2 px-4 ease-in duration-100"}>
                            Ausgabe
                        </div>
                        <div className={isExpense === false ? "text-right py-2 px-4 bg-green-500 ease-in duration-100" : "text-right py-2 px-4 ease-in duration-100"}>
                            Einkommen
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-white py-2">
                        <label htmlFor="">Betrag:</label>
                    </div>
                    <input type="number" onChange={changeValue} value={transactionValue} />
                </div>
                <div>
                    <div className="text-white py-2">
                        <label htmlFor="">Datum:</label>
                    </div>
                    <input type="date" onChange={changeDate} value={transactionDate} />
                </div>
                <div>
                    <div className="text-white py-2">
                        <label htmlFor="">Bemerkung:</label>
                    </div>
                    <input type="text" onChange={changeNote} value={transactionNote} />
                </div>
                <div>
                    <div className="text-white py-2">
                        <label htmlFor="">Art der Ausgabe/Einnahme:</label>
                    </div>
                    <ExpenseTypeSelector expenseExpenseTypes={expenseExpenseTypes} />
                </div>
            </div>
        </div>
    );
}
