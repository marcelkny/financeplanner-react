import { TransactionViewModelArray } from "../models/transactionview.model";
import { authDatabaseWithPass } from "../utils/backend-auth";
import { isTransactionViewModelArray } from "../utils/model-predicates";

const TransactionTable = "tbl_transactions";
const TransactionViewTable = "view_transactions_full";

class TransactionRepository {
    async viewTransactions(user_id: string, deposit_id: string): Promise<TransactionViewModelArray>{
        const pocketBase = await authDatabaseWithPass();
        const records= await pocketBase.collection(TransactionViewTable).getFullList({
            sort: "-created",
            filter: `user_id = "${user_id}" && deposit_id = "${deposit_id}"`,
        });
        if (!isTransactionViewModelArray(records)) {
            throw new Error("Unexpected Schema");
        }
        if (records.length <= 0) {
            throw new Error("User not found");
        }
        return records;
    }

}
export default TransactionRepository;