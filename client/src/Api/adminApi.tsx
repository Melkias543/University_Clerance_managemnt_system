
import axiosConfig from "../config/axiosConfig";


export const getCearanceApplicantadmin = async () => {
  console.log("hey")
  const res = await axiosConfig.get("/clearance/applicants");
  return res.data

}