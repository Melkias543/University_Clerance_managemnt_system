import api from "@/config/axiosConfig";
import { IssuedRecord } from "@/types/issue";


type RoleKey =
  | "book_store_keeper"
  | "librarian"
  | "sport_office"
  | "women_affairs"
  | "cafteria"
  | "dormitory_office"
  | "registrar_office"
  | "student_loan"
  | "dept_head"
  | "college_dean";

// 🔗 Clearance Endpoints Grouped by Operation
// 🟢 CREATE (POST)
const create = {
  book_store_keeper: "/issudeStudent/IssueSaveatBookstore",
  librarian: "/issudeStudent/IssueSaveatLibrary",
  sport_office: "/issudeStudent/IssueSaveatSport",
  women_affairs: "/issudeStudent/IssueSaveatWomenYouth",
  cafteria: "/issudeStudent/IssueSaveatCafeteria",
  dormitory_office: "/issudeStudent/IssueSaveatDormitory",
  registrar_office: "/issudeStudent/IssueSaveatRegistral",
  student_loan: "/issudeStudent/IssueSaveatStudentLoan",
  dept_head: "/issudeStudent/IssueSaveatDepartmentHead",
  college_dean: "/issudeStudent/IssueSaveatCollegeDean",
};

// 🔵 GET ALL (GET)
const getAll: Record<RoleKey, string> = {
  book_store_keeper: "/issudeStudent/getAllIsueFromBokStore",
  librarian: "/issudeStudent/getAllIsueFromLibrary",
  sport_office: "/issudeStudent/getAllIsueFromSport",
  women_affairs: "/issudeStudent/getAllIsueFromWomenYouth",
  cafteria: "/issudeStudent/getAllIsueFromCafeteria",
  dormitory_office: "/issudeStudent/getAllIsueFromDormitory",
  registrar_office: "/issudeStudent/getAllIsueFromRegistral",
  student_loan: "/issudeStudent/getAllIsueFromStudentLoan",
  dept_head: "/issudeStudent/getAllIsueFromDepartmentHead",
  college_dean: "/issudeStudent/getAllIsueFromCollegeDean",
};

// 🟣 GET SINGLE (GET by ID)
const getSingle = {
  book_store_keeper: "/issudeStudent/getSingleIsueFromBokStore",
  librarian: "/issudeStudent/getSingleIsueFromLibrary",
  sport_office: "/issudeStudent/getSingleIsueFromSport",
  women_affairs: "/issudeStudent/getSingleIsueFromWomenYouth",
  cafteria: "/issudeStudent/getSingleIsueFromCafeteria",
  dormitory_office: "/issudeStudent/getSingleIsueFromDormitory",
  registrar_office: "/issudeStudent/getSingleIsueFromRegistral",
  student_loan: "/issudeStudent/getSingleIsueFromStudentLoan",
  dept_head: "/issudeStudent/getSingleIsueFromDepartmentHead",
  college_dean: "/issudeStudent/getSingleIsueFromCollegeDean",
};

// 🔴 DELETE (DELETE by ID)
const TOdelete = {
  book_store_keeper: "/issudeStudent/deleteIssuedAtBookstore",
  librarian: "/issudeStudent/deleteIssuedAtLibrary",
  sport_office: "/issudeStudent/deleteIssuedAtSport",
  women_youth: "/issudeStudent/deleteIssuedAtWomenYouth",
  cafteria: "/issudeStudent/deleteIssuedAtCafeteria",
  dormitory_office: "/issudeStudent/deleteIssuedAtDormitory",
  registrar_office: "/issudeStudent/deleteIssuedAtRegistral",
  student_loan: "/issudeStudent/deleteIssuedAtStudentLoan",
  dept_head: "/issudeStudent/deleteIssuedAtDepartmentHead",
  college_dean: "/issudeStudent/deleteIssuedAtCollegeDean",
};

// 🟠 APPROVE STATUS (PUT)
const approve = {
  book_store_keeper: "/issudeStudent/aproveStatusAtBookStore",
  librarian: "/issudeStudent/aproveStatusAtLibrary",
  sport_office: "/issudeStudent/aproveStatusAtSport",
  women_affairs: "/issudeStudent/aproveStatusAtWomenYouth",
  cafteria: "/issudeStudent/aproveStatusAtCafeteria",
  dormitory_office: "/issudeStudent/aproveStatusAtDormitory",
  registrar_office: "/issudeStudent/aproveStatusAtRegistral",
  student_loan: "/issudeStudent/aproveStatusAtStudentLoan",
  dept_head: "/issudeStudent/aproveStatusAtDepartmentHead",
  college_dean: "/issudeStudent/aproveStatusAtCollegeDean",
};

const Toupdate = {
  book_store_keeper: "/issudeStudent/updateIssuedAtBookStore",
  librarian: "/issudeStudent/updateIssuedAtLibrary",
  sport_office: "/issudeStudent/updateIssuedAtSport",
  women_affairs: "/issudeStudent/updateIssuedAtWomenYouth",
  cafteria: "/issudeStudent/updateIssuedAtCafeteria",
  dormitory_office: "/issudeStudent/updateIssuedAtDormitory",
  registrar_office: "/issudeStudent/updateIssuedAtRegistral",
  student_loan: "/issudeStudent/updateIssuedAtStudentLoan",
  dept_head: "/issudeStudent/updateIssuedAtDepartmentHead",
  college_dean: "/issudeStudent/updateIssuedAtCollegeDean",
};
export const fetchall = async(role: string) => {
console.log(role)
  const url = getAll[role as RoleKey];
  console.log(url)// ✅ safe after check
     const res = await api.get(url);
     return res.data;

};

export const createIssue = async (data:IssuedRecord, role:string) => {
  if (role in create) {
    const url = create[role as RoleKey];
    const res = await api.post(url, data);
    return res.data
  }
}
export const updateIssue = async (data: IssuedRecord, id: string, role: string) => {
  console.log("nan gibadhem", role, id, data);
  const url = Toupdate[role as RoleKey];
  console.log("update url", url);
  console.log("Full PUT URL:", `${url}/${id}`);
  const res = await api.put(`${url}/${id}`, data);
  return res.data;
};



export const Delete = async (id:string, role:string) => {
  console.log(id,role)
      const url = TOdelete[role as RoleKey];

      const res = await api.delete(`${url}/${id}`);
      return res.data;
  
  
}

export const single = async (id:string, role:string) => {
   
      const url = getSingle[role as RoleKey];
      const res = await api.put(`${url}/${id}`);
      return res.data;
  
 };

export const Aprove = async (id: string, status: string, role: string) => {
  if (role in approve) {
    const url = approve[role as RoleKey];
    console.log(url)
    const res = await api.put(`${url}/${id}`,{ status});
    return res.data;
  }
};