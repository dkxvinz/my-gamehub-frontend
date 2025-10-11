export interface TransactionGetRes {
    trans_id:   number;
    statements: string;
    price:      number;
    type:       number;
    trans_date: Date;
    user_id:    string;
}
