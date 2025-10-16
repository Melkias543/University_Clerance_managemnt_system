"use client";

import axiosConfig from "../config/axiosConfig";
export const toApply = async (Formdata) => {
  // toast.loading("Submitting application...");
  // try {
  // console.log("data",Formdata)
  const response = await axiosConfig.post("/clearance/apply", Formdata);

  return response.data;
};

export const getData = async (student) => {
  const res = await axiosConfig.get(`clearance/singleAplicant/${student}`);
  // console.log("here",res)
  return res.data;
};

const clearanceUrls = {
  Dormitory: "/clearance/apply/toDormitory",
  Cafteria: "/clearance/apply/toCaffe",
  "Book Store": "/clearance/apply/toBookStore",
  "Sport Office": "/clearance/apply/toSport",
  "Department Head": "/clearance/apply/toDeptHead",
  Library: "/clearance/apply/toLibrary",
  "Student Loan": "/clearance/apply/toStudLoan",
  "Registral Office": "/clearance/apply/toRegistral",
  "College Dean": "/clearance/apply/toCollegeDean",
  "Women And Youth Affairs": "/clearance/apply/toWomenAndYouth",
};

export const SubmitApplication = async (type, data) => {
  const url = clearanceUrls[type];
  if (!url) {
    console.error(`❌ Invalid clearance type: ${type}`);
    throw new Error(`Invalid clearance type: ${type}`);
    return;
  }
  // console.log("url",url)
  // console.log(type, data)

  const submitIt = await axiosConfig.post(url, data);
  return submitIt.data;
  // return data.full_name;
};

const getRequestUrl = {
  book_store_keeper: "/clearance/getAllfromBookStore",
  dormitory_office: "/clearance/getAllFromDormitory",
  cafteria: "/clearance/getAllFromCafteria",
  Sport: "/clearance/getAllFromSport",
  Dept_Head: "/clearance/getAllFromDeptHead",
  librarian: "/clearance/getAllFromLibrary",
  student_loan: "/clearance/getAllFromRegistral",
  college_dean: "/clearance/getAllFromCollegeDean",
  women_affairs: "/clearance/getAllFromWomenAndYouth",
};



export const getApplication = async (role) => {

  const url = getRequestUrl[role]
  console.log(role);
  console.log(url);
  if (!url) {
    throw new Error(`No URL found for role: ${role}`);
  }
  const data = await axiosConfig.get(url);
  return data.data;
};
export const approvalUrls = {
  book_store_keeper: "/clearance/AproveOrRejectAtBookStore",
  dormitory_office: "/clearance/AproveOrRejectAtDormitory",
  cafteria: "/clearance/AproveOrRejectAtCaffe",
  Sport: "/clearance/AproveOrRejectAtSport",
  Dept_Head: "/clearance/AproveOrRejectAtDeptHead",
  librarian: "/clearance/AproveOrRejectAtLibrary",
  student_loan: "/cjl",
  college_dean: "/clearance/AproveOrRejectCollegeDean",
  women_affairs: "/clearance/AproveOrRejectAtWomenAndYouth",
};

export const aproveOrReject = async (status, id) => {
  console.log(status);
  const response = await axiosConfig.put(
    `/clearance/AproveOrRejectAtBookStore/${id}`,
    { status }
  );

  return response.data;
};

