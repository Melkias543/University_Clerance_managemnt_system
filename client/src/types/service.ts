export interface servicetype {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default interface WithdrawalForm {
  full_name: string;
  university_email: string;
  university_id: string;
  department: string;
  year_batch: string;
  reason_for_withdrawal: string;
  student: string;
  clearance_date: string; // stored as 'YYYY-MM-DD'
}
