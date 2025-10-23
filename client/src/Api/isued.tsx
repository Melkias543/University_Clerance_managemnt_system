import api from "@/config/axiosConfig";


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
  book_store_keeper: "/issudeStudent/getSingleIsueFromBokStore/:id",
  librarian: "/issudeStudent/getSingleIsueFromLibrary/:id",
  sport_office: "/issudeStudent/getSingleIsueFromSport/:id",
  women_affairs: "/issudeStudent/getSingleIsueFromWomenYouth/:id",
  cafteria: "/issudeStudent/getSingleIsueFromCafeteria/:id",
  dormitory_office: "/issudeStudent/getSingleIsueFromDormitory/:id",
  registrar_office: "/issudeStudent/getSingleIsueFromRegistral/:id",
  student_loan: "/issudeStudent/getSingleIsueFromStudentLoan/:id",
  dept_head: "/issudeStudent/getSingleIsueFromDepartmentHead/:id",
  college_dean: "/issudeStudent/getSingleIsueFromCollegeDean/:id",
};

// 🔴 DELETE (DELETE by ID)
const TOdelete = {
  book_store_keeper: "/issudeStudent/deleteIssuedAtBookstore/:id",
  librarian: "/issudeStudent/deleteIssuedAtLibrary/:id",
  sport_office: "/issudeStudent/deleteIssuedAtSport/:id",
  women_youth: "/issudeStudent/deleteIssuedAtWomenYouth/:id",
  cafteria: "/issudeStudent/deleteIssuedAtCafeteria/:id",
  dormitory_office: "/issudeStudent/deleteIssuedAtDormitory/:id",
  registrar_office: "/issudeStudent/deleteIssuedAtRegistral/:id",
  student_loan: "/issudeStudent/deleteIssuedAtStudentLoan/:id",
  dept_head: "/issudeStudent/deleteIssuedAtDepartmentHead/:id",
  college_dean: "/issudeStudent/deleteIssuedAtCollegeDean/:id",
};

// 🟠 APPROVE STATUS (PUT)
const approve = {
  book_store_keeper: "/issudeStudent/aproveStatusAtBookStore/:id",
  librarian: "/issudeStudent/aproveStatusAtLibrary/:id",
  sport_office: "/issudeStudent/aproveStatusAtSport/:id",
  women_affairs: "/issudeStudent/aproveStatusAtWomenYouth/:id",
  cafteria: "/issudeStudent/aproveStatusAtCafeteria/:id",
  dormitory_office: "/issudeStudent/aproveStatusAtDormitory/:id",
  registrar_office: "/issudeStudent/aproveStatusAtRegistral/:id",
  student_loan: "/issudeStudent/aproveStatusAtStudentLoan/:id",
  dept_head: "/issudeStudent/aproveStatusAtDepartmentHead/:id",
  college_dean: "/issudeStudent/aproveStatusAtCollegeDean/:id",
};

export const fetchall = async(role: string) => {
   if (role in getAll) {
     const url = getAll[role as RoleKey]; // ✅ safe after check
     const res = await api.get(url);
     return res.data;
   }
};
