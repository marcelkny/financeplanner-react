import { TransactionViewModel } from "../../models/transactionview.model";
import { handleDate } from "../../utils/datehandler";

export function TransactionItem({ transaction }: { transaction: TransactionViewModel }) {
    console.log("transaction: ", transaction);
    return (
        <div className="grid grid-cols-12 border-b border-slate-400 pb-2">
            <div className="col-start-1 col-span-8">
                <div className="text-xl">{transaction.type_name}</div>
                <div className="text-sm text-gray-300">{transaction.note} test</div>
            </div>
            <div className="col-start-9 col-span-4 flex items-center">
                <div className="text-right w-full text-xl">{transaction.amount.toFixed(2)} €</div>
            </div>
            <div className="col-start-1 col-span-12 row-start-2 flex justify-between mt-2">
                <div>{transaction.category_name}</div>
                <div>{handleDate(new Date(transaction.date), "DDMMYYYY")}</div>
            </div>
        </div>
    );
}
