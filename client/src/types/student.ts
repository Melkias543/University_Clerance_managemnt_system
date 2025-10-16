import { Role } from "./role";



export interface Approvals {
  _id: string;
  office: string;
  status: "Aproved" | "Rejected" | "Pending"; // exact statuses
  date: string; // ISO date string
}

export interface Student {
  student_id?: string;
  full_name: String;
  university_email: string;
  student_university_id: string;
  department: string;
  //  year_of_study:Date,
  password: string;
  role: string;
  _id: string;

  university_id: string;
  year_batch: string;
  reason_for_withdrawal: string;
  clearance_date: string;
  student: string; // student ID
  approvals: Approvals[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}