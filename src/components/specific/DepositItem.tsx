import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepositAmountModel } from "../../models/deposit.model";
import { LoadingReset, useLoadingContext } from "../../context/LoadingContext";

export function DepositItem({ item, href }: { item: DepositAmountModel; href: string }) {
    const [amountClass, setAmountClass] = useState("");
    const [loadingContext, dispatchIsLoading] = useLoadingContext();
    const navigate = useNavigate();
    const navTo = useCallback(
        (target: string) => {
            const loadingAction = LoadingReset();
            dispatchIsLoading(loadingAction);
            navigate(target);
        },
        [navigate]
    );
    const reloadCallback = useCallback(async () => {
        if (item.amount < 0) {
            setAmountClass("text-red-500");
        }
    }, []);
    useEffect(() => {
        reloadCallback();
    }, [reloadCallback]);
    return (
        <div
            className="border-b border-slate-400 pb-2 grid grid-cols-12 hover:cursor-pointer"
            onClick={() => {
                navTo(href);
            }}
        >
            <div className="col-start-1 col-span-8">
                <div className="text-xl">{item.name}</div>
                <div className="text-sm text-gray-300">{item.note}</div>
            </div>
            <div className="col-start-9 col-span-4 flex items-center">
                <div className={"w-full text-right text-lg " + amountClass}>{item.amount.toFixed(2)} €</div>
            </div>
        </div>
    );
}
