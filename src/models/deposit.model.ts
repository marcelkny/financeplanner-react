export interface DepositModel {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    name: string;
    note: string;
    updated: string;
    user_id: string;
}

export type DepositModelArray = DepositModel[];

export interface DepositAmountModel extends DepositModel{
    amount: number;
}
export type DepositAmountModelArray = DepositAmountModel[];
