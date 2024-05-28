import { authDatabaseWithPass } from "../utils/backend-auth";
import { isExpenseTypeModelArray } from "../utils/model-predicates";

const ExpenseTypeTable = "tbl_expense_types";
const ExpenseTypeViewTable = "view_expense_types_full";

class ExpenseTypeRepository {

    async getExpenseTypes() {
        const pocketBase = await authDatabaseWithPass();
        const records = await pocketBase.collection(ExpenseTypeTable).getFullList({
            sort: "name",
        });
        if (!isExpenseTypeModelArray(records)) {
            throw new Error("Unexpected Schema");
        }
        if (records.length <= 0) {
            throw new Error("User not found");
        }
        return records;
    }
}
export default ExpenseTypeRepository;