import { Role } from "@/types/role";
import axiosConfig from "../config/axiosConfig";
import { Staff } from "@/types/staff";

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


export const getStaff = async () => {
  
  const data = await axiosConfig.get("/admin/allStaff");
  return data.data
}

export const createStaff = async(data:Staff) => {
  const res = await axiosConfig.post("/admin/newStaff", data);
  return res.data
  
}
export const UpdateStaff = async (data: Staff, id: Staff) => {
  console.log(data,id)
  const res = await axiosConfig.put(`/admin/editStaff/${id}`, data);
  return res.data;
};

export const deleteStaff = async (id:string) => {
  const res = await axiosConfig.delete(
    `/admin/deleteStaff/${id}`
  );
    return res
}
export const view = async (id: string) => {
  const res = await axiosConfig.get(`/admin/singleStaff/${id}`);
  return res.data;
};