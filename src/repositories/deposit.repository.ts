import { authDatabaseWithPass } from "../utils/backend-auth";
import { isDepositModelArray } from "../utils/model-predicates";

const DepositTable = "tbl_deposits";

class DepositRepository {
    async getDeposits(user_id: string) {
        const pocketBase = await authDatabaseWithPass();
        const records = await pocketBase.collection(DepositTable).getFullList({
            sort: "name",
            filter: `user_id = "${user_id}"`,
        });
        if (!isDepositModelArray(records)) {
            throw new Error("Unexpected Schema");
        }
        if (records.length <= 0) {
            throw new Error("User not found");
        }
        return records;
    }
}
export default DepositRepository;
