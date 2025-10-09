import Role from "../models/roleModel.js";
import { Staff } from "../models/staffModels.js";

const checkIfExist = async (email) => {
  try {
      const checkIfexist = await Staff.findOne({ email });
      return checkIfexist;
  } catch (error) {
    console.log(error)
    throw error
  }
}

const newStaffService = async(data) => {
try {
    const { full_name, email, salary, hired_date, role_id } = data;

  

  

  const staff = await Staff.create({
    full_name,
    email,
    salary,
    hired_date,
    role_id,
  });
  
  return staff

} catch (error) {
  console.log(error)
  throw error
}  
}

const editStaffService = async (data) => {
  
  try {
    const { id, full_name, email, salary, role_id } = data
    const updated = await Staff.findByIdAndUpdate(
      id ,
      {$set:{ full_name, email, salary, role_id }},
      { new: true, runValidators: true }
    );
    return updated
  } catch (error) {
    console.log(error)
    throw error
    
  }
}


const deleteStaffService = async (id) => {
  try {
    // const { id, full_name, email, salary, role_id } = data;
    const deleted = await Staff.findByIdAndDelete(
      { _id: id }
    );
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllStaffs =async () => {
  try {
    const data = await Staff.find().populate("role_id");
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }

}
const getSingleStaffs = async (id) => {
  try {
    const data = await Staff.findOne({ _id: id }).populate("role_id");;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addRole = async (role_name) => {
  try {
    const created = await Role.create({ role_name })
    return created
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateRole = async (id, role_name) => {
  console.log(id,role_name)
  try {
    const edited = await Role.findByIdAndUpdate(
      id,
      { role_name },
      { new: true, runValidators: true }
    );
    return edited
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteRole = async(id) => {
  try {
    const toDelete = await Role.findByIdAndDelete(id)
    return toDelete
  } catch (error) {
    console.log(error)
    throw error
  }
}


const Roles = async () => {
  try {
    const data = await Role.find()
        return data;

  } catch (error) {
    console.log(error)
    throw error
  }
}

const SingleRole = async (id) => {
  try {
    const data = await Role.findOne(id)
    return data
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default {
  checkIfExist,
  newStaffService,
  editStaffService,
  deleteStaffService,
  getAllStaffs,
  getSingleStaffs,
  addRole,
  updateRole,
  deleteRole,
  SingleRole,
  Roles,
};