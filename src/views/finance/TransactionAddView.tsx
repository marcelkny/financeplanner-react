import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TransactionItem } from "../../components/specific/TransactionItem";
import { useSession } from "../../context/SessionContext";
import { TransactionViewModel } from "../../models/transactionview.model";
import TransactionRepository from "../../repositories/Transaction.Repository";
import { dispatchNavigationInfo } from "../../utils/dispatchNavigationInfo";
import { NavigationSetUserNavigation, useNavigationContext } from "../../context/NavigationContext";

export function TransactionAddView() {
    return (
        <div className="pt-4 text-white"> Neue Transaktion
        </div>
    );
}
