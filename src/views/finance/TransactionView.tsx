import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TransactionItem } from "../../components/specific/TransactionItem";
import { useSession } from "../../context/SessionContext";
import { TransactionViewModel } from "../../models/transactionview.model";
import TransactionRepository from "../../repositories/Transaction.Repository";
import { dispatchNavigationInfo } from "../../utils/dispatchNavigationInfo";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";

export function TransactionView() {
    const [session] = useSession();
    const [searchParams, setSearchParams] = useSearchParams();

    const [deposit_id] = useState<string | null>(searchParams.get("id"));
    const [transactions, setTransactions] = useState<TransactionViewModel[]>([]);
    const [, dispatchNavInfo] = useNavigationContext();
    const reloadCallback = useCallback(async () => {
        const navAction = NavigationSetUserNavigation({ id: "transactions", title: "Transaktionen", return_id: "" });
        dispatchNavInfo(navAction);
        const user_id = session.userInfo.user_id;
        if (!deposit_id || deposit_id === null) throw new Error("no Deposit ID");
        await new TransactionRepository()
            .viewTransactions(user_id, deposit_id)
            .then((result: TransactionViewModel[]) => {
                console.log("transactionResult: ", result);
                setTransactions(result);
            })
            .catch((err) => {
                console.error("error: ", err);
            });
    }, []);
    useEffect(() => {
        reloadCallback();
    }, [reloadCallback]);
    return (
        <div className="pt-4 text-white flex flex-col gap-4">
            {transactions.map((transaction: TransactionViewModel, i: number) => (
                <TransactionItem key={i} transaction={transaction} />
            ))}
        </div>
    );
}
