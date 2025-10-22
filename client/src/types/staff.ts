export interface Role {
  _id?: string;
  role_name: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Staff {
  _id?: string;
  full_name: string;
  email: string;
  password: string;
  salary: number;
  hired_date: string; // or Date if parsed
  role_id: Role | ""|string; // ✅ sometimes null — prevent runtime error
}
