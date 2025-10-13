
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
  "Dormitory": "/clearance/apply/toDormitory",
  "Cafteria": "/clearance/apply/toCaffe",
  "Book Store": "/clearance/apply/toBookStore",
  "Sport Office": "/clearance/apply/toSport",
  "Deprtment head": "/clearance/apply/toDeptHead",
  "Library": "/clearance/apply/toLibrary",
  "Student Loan": "/clearance/apply/toStudLoan",
  "Registral office": "/clearance/apply/toRegistral",
  "College Dean": "/clearance/apply/toCollegeDean",
  "Women And Youth Affairs": "/clearance/apply/toWomenAndYouth",
};





export const SubmitApplication = async (type,data) => {
  const url = clearanceUrls[type]
  if (!url) {
    console.error(`❌ Invalid clearance type: ${type}`);
    throw new Error(`Invalid clearance type: ${type}`);
    return
  }
  // console.log("url",url)
  // console.log(type, data)


  const submitIt = await axiosConfig.post(url, data)
  return submitIt.data
  // return data.full_name;
}




