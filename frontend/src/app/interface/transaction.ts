export interface Transaction {
  wallet_name: string,
  transaction_type: string,
  transaction_amount: number,
  transaction_desc: string,
  created_at: Date
}
