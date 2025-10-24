// Student info structure
interface Student {
  id: string;
  full_name: string;
  university_email: string;
  student_university_id: string;
  department: string;
  role: string;
}

// Withdrawal info structure
interface WithdrawalInfo {
  application_id: string;
  clearance_date: string; // ISO string, not Date yet
  department: string;
  full_name: string;
  university_email: string;
  university_id: string;
  year_batch: string;
  reason: string;
}

// Main object structure
export interface Applicant {
  id: string;
  action: string;
  submitted_at: string;
  student: Student;
  withdrawal_info: WithdrawalInfo;
  status:string
}
