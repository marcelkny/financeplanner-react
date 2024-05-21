import { useCallback, useEffect, useState } from "react";
import { DepositItem } from "../../components/specific/DepositItem";
import { LoadingSetLoadingScreen, useLoadingContext } from "../../context/LoadingContext";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";
import { useSession } from "../../context/SessionContext";
import { DepositAmountModelArray, DepositModelArray } from "../../models/deposit.model";
import TransactionRepository from "../../repositories/Transaction.Repository";
import DepositRepository from "../../repositories/deposit.repository";

export default function HomeView() {
    const [, dispatchNavInfo] = useNavigationContext();
    const [loadingContext, dispatchIsLoading] = useLoadingContext();
    const [session] = useSession();
    const [deposits, setDeposits] = useState<DepositAmountModelArray>([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const reloadCallback = useCallback(async () => {
        console.log("Loading State in HomeView: ", loadingContext.isLoading);
        const navAction = NavigationSetUserNavigation({ id: "home", title: "Finanzmanager", return_id: null });
        dispatchNavInfo(navAction);
        const depositsWithAmounts: DepositAmountModelArray = await new DepositRepository()
            .getDeposits(session.userInfo.user_id)
            .then(async (result: DepositModelArray) => {
                const depositResult = result;
                const depositsWithAmounts: DepositAmountModelArray = [];
                for (const deposit of depositResult) {
                    const transactionsForDeposit = await new TransactionRepository().viewTransactions(session.userInfo.user_id, deposit.id);
                    let amount = 0;
                    for (const trx of transactionsForDeposit) {
                        trx.is_cost === true ? (amount -= trx.amount) : (amount += trx.amount);
                    }
                    depositsWithAmounts.push({
                        ...deposit,
                        amount: amount,
                    });
                }
                setDeposits(depositsWithAmounts);
                const isLoadingPrepare = LoadingSetLoadingScreen({ isLoading: false });
                dispatchIsLoading(isLoadingPrepare);
                console.log("isLoading State dispached");
                return depositsWithAmounts;
            });
        let balance = 0;
        for (const deposit of depositsWithAmounts) {
            balance += deposit.amount;
        }
        setTotalBalance(balance);
    }, []);
    useEffect(() => {
        reloadCallback();
    }, [reloadCallback]);
    return (
        <div className="pt-4 text-white">
            <div className="px-2 py-2 rounded-md bg-slate-600 flex justify-between text-xl">
                <div>Gesamtstand:</div>
                <div>{totalBalance.toFixed(2)} €</div>
            </div>
            <div className="pt-4 flex flex-col gap-4">
                {deposits.map((deposit) => (
                    <DepositItem key={deposit.id} item={deposit} href={`/transactions?id=${deposit.id}`} />
                ))}
            </div>
        </div>
    );
}
