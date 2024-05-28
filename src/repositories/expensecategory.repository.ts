import { authDatabaseWithPass } from "../utils/backend-auth";
import { isExpenseCategoryModelArray } from "../utils/model-predicates";


const ExpenseCategoryTable = "tbl_expense_categories";

class ExpenseCategoryRepository{

    async getExpenseCategories() {
        const pocketBase = await authDatabaseWithPass();
        const records = await pocketBase.collection(ExpenseCategoryTable).getFullList({
            sort: "name",
        });
        if (!isExpenseCategoryModelArray(records)) {
            throw new Error("Unexpected Schema");
        }
        if (records.length <= 0) {
            throw new Error("User not found");
        }
        return records;
    }
}
export default ExpenseCategoryRepository;