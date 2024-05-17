import PocketBase from "pocketbase";
import { BACKEND_URL, DB_PASSWORD, DB_USER } from "../config/backend.config";


export async function authDatabaseWithPass() {
    const pb = new PocketBase(BACKEND_URL);
    const authData = await pb.collection("users").authWithPassword(DB_USER, DB_PASSWORD);
    return pb;
}

export async function authClear() {
    const pb = new PocketBase(BACKEND_URL);
    // "logout" the last authenticated model
    pb.authStore.clear();
}
