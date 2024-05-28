import { useCallback } from "react";
import { ExpenseTypeModel, ExpenseTypeModelArray } from "../../../models/type.model";

function ExpenseTypeSelectorItem({ expenseType }: { expenseType: ExpenseTypeModel }) {
    return (
        <option value={expenseType.id}>
            {expenseType.category_id === "2ardktflr8obifv" || expenseType.category_id === "uf8jhpx11w75jln"
                ? `${expenseType.name} (Einnahme)`
                : `${expenseType.name} (Ausgabe)`}
        </option>
    );
}
export function ExpenseTypeSelector({ expenseExpenseTypes }: { expenseExpenseTypes: ExpenseTypeModelArray }) {
    return (
        <select name="" id="" className="w-fit">
            {expenseExpenseTypes.map((type: ExpenseTypeModel, index: number) => (
                <ExpenseTypeSelectorItem expenseType={type} key={index} />
            ))}
        </select>
    );
}
