export interface TransactionViewModel {
    id: string;
    amount: number;
    date: string;
    note: string;
    deposit_id: string;
    category_id: string;
    category_name: string;
    is_cost: boolean;
    type_id: string;
    type_name: string;
    user_id: string;
    collectionId: string;
    collectionName: string;
    created: string;
}

export type TransactionViewModelArray = TransactionViewModel[];