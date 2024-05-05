import { createClient } from "@supabase/supabase-js";
import { LoginForm } from "../../components/forms/LoginForm";
import { useCallback, useEffect, useState } from "react";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../../config/config";
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8091');

export default function LoginView() {
    const [countries, setCountries] = useState<any>([]);

    const getCountries = useCallback(async () => {
        await pb.collection('users').authWithPassword('pocket_user', 'J-Wkd3y216Bie8T');
        const records = await pb.collection('tbl_fin_expense_categories').getFullList({
            sort: '-created',
        });
        setCountries(records);
    }, []);
    useEffect(() => {
        getCountries();
    }, [getCountries]);
    return (
        <>
            {countries ? <ul>
                {countries.map((country: any) => (
                    <li key={country.category_name}>{country.category_name}</li>
                ))}
            </ul> : null}
            <LoginForm />
        </>
    );
}
