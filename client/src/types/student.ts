import { Role } from "./role";


export interface Student {
  student_id?: string;
  full_name: String;
  university_email: string;
  student_university_id: string;
  department: string;
  //  year_of_study:Date,
  password: string;
  role: string;
}