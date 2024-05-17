import { UserModel } from "../models/user.model";
import { authClear, authDatabaseWithPass } from "../utils/backend-auth";
import { isUserModelArray } from "../utils/model-predicates";

const UserTable = "tbl_users";
class UserRepository {
    async getUserByEmail(email: string): Promise<[UserModel, string]> {
        const pocketBase = await authDatabaseWithPass();
        const token = pocketBase.authStore.token;
        console.log("user: ", email);
        const records: UserModel[] = await pocketBase.collection(UserTable).getFullList({
            sort: "-created",
            filter: `email = "${email}"`,
        });
        if (!isUserModelArray(records)) {
            throw new Error("Unexpected Schema");
        }
        if (records.length <= 0) {
            throw new Error("User not found");
        }
        if (records.length > 1) {
            throw new Error("Multiple Users found");
        }
        console.log("records: ", records);
        return [records[0], token];
    }
}

export default UserRepository;
