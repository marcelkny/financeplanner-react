import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TransactionItem } from "../../components/specific/TransactionItem";
import { useSession } from "../../context/SessionContext";
import { TransactionViewModel } from "../../models/transactionview.model";
import TransactionRepository from "../../repositories/transaction.repository";
import { dispatchNavigationInfo } from "../../utils/dispatchNavigationInfo";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";
import { LoadingSetLoadingScreen, useLoadingContext } from "../../context/LoadingContext";

export function TransactionView() {
    const [session] = useSession();
    const [loadingContext, dispatchIsLoading] = useLoadingContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalBalance, setTotalBalance] = useState(0);
    const [deposit_id] = useState<string | null>(searchParams.get("id"));
    const [transactions, setTransactions] = useState<TransactionViewModel[]>([]);
    const [, dispatchNavInfo] = useNavigationContext();
    const reloadCallback = useCallback(async () => {
        const navAction = NavigationSetUserNavigation({ id: "transactions", title: "Transaktionen", return_id: "/" });
        dispatchNavInfo(navAction);
        const user_id = session.userInfo.user_id;
        if (deposit_id && deposit_id !== null) {
            await new TransactionRepository()
                .viewTransactions(user_id, deposit_id)
                .then((result: TransactionViewModel[]) => {
                    console.log("transactionResult: ", result);
                    setTransactions(result);
                    let balance = 0;
                    for (const deposit of result) {
                        balance += deposit.amount;
                    }
                    setTotalBalance(balance);
                    const isLoadingPrepare = LoadingSetLoadingScreen({ isLoading: false });
                    dispatchIsLoading(isLoadingPrepare);
                })
                .catch((err) => {
                    console.error("error: ", err);
                });
        }
    }, []);
    useEffect(() => {
        reloadCallback();
    }, [reloadCallback]);
    return (
        <div className="pt-4 text-white">
            <div className="px-2 py-2 rounded-md bg-slate-600 flex justify-between text-xl">
                <div>Stand:</div>
                <div>{totalBalance.toFixed(2)} €</div>
            </div>
            <div className="pt-4 text-white flex flex-col gap-4">
                {transactions.map((transaction: TransactionViewModel, i: number) => (
                    <TransactionItem key={i} transaction={transaction} />
                ))}
            </div>
        </div>
    );
}
