import { Role } from "@/types/role";
import axiosConfig from "../config/axiosConfig";

export const getCearanceApplicantadmin = async () => {
  console.log("hey");
  const res = await axiosConfig.get("/clearance/applicants");
  return res.data;
};

export const getAllRoles = async () => {
  const res = await axiosConfig.get("/admin/getAllRole");
  // console.log(res)
  return res.data;
};

export const sendRole = async (role_name: Partial<Role>) => {
  const res = await axiosConfig.post("/admin/createRole", role_name);
  return res.data;
};

export const editRole = async (id: string, role_name: string) => {
  // console.log("from update", id, role_name);
  const res = await axiosConfig.put(`/admin/editRole/${id}`, {role_name});
  return res;
};
export const deleteRole = async (id: string) => {
  console.log("from deletion Api", id);
  const res = await axiosConfig.delete(`/admin/deleteRole/${id}`);
  return res.data;
};
