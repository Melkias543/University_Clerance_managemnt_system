import Role from "../../models/roleModel.js";
import adminServices from "../../services/adminServices.js";
import mongoose from "mongoose";

const newStaff = async(req,res) => {
  try {


    const { full_name, email,password, salary, hired_date, role_id } = req.body;
    
    if (!full_name || !email || !password|| !salary || !hired_date || !role_id) {
      res.status(400).json({
        status: false,
        msg:"All fields are reguired."
      })
    }
    const exist = await adminServices.checkIfExist(email);
    if (exist) {
      return res.status(409).json({
        status: false,
        msg:"Staff already Exist whith this email."
      })
    }
const data = { full_name, email,password, salary, hired_date, role_id };

    const staff = await adminServices.newStaffService(data);
    
    if (!staff) {
      return res.status(400).json({
        status: false,
        msg:"Fail to Create new staff."
      })
    }
    return res.status(201).json({
      status: true,
      msg:"New Staff is Created Successfully."
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      msg:"Internal server Error."
    })
  }
} 


const editStaff = async(req, res) => {
  
  try {
// hired_date Cant updated
    const { full_name, email,password, salary, role_id } = req.body;
    const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id) || !id) {
        return res.status(400).json({
          status: false,
          msg: "Invalid ID or ID is Not provided",
        });
    }
    if (!full_name ||!password|| !email || !salary || !role_id) {
      return res.status(400).json({
        status: false,
        msg:"ALl fields are reguired to update."
      })
    }
      if (req.body.hired_date) {
        return res.status(400).json({
          status: false,
          msg: "Hired Date can't Updated.",
        });
      }
 const exist = await adminServices.checkIfExist(email);
 if (exist) {
   return res.status(409).json({
     status: false,
     msg: "Staff already Exist whith this email in another column.",
   });
 }
  const  data = { full_name, email,password, salary, role_id, id };
    const editedStaff = await adminServices.editStaffService(data)
    if (!editedStaff) {
      return res.status(400).json({
        status: false,
        msg:"Fail To update Staff."
      })
    }

    
    return res.status(400).json({
      status: true,
      msg: "Updated Successfully.",
      
      data:editedStaff
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      msg:"Internal Server Error."
    })
  }
}

const deleteStaff = async(req, res) =>
{
  try {
    
    
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        msg:"Invalid or No Id Provided."
      })
    }

    const deleted = await adminServices.deleteStaffService(id)
    
    if (!deleted) {
      return res.status(400).json({
        status: false,
        msg:"Fail To Delete staff"
  })
    }
    return res.status(200).json({
      status: true,
      msg:"Deleted successfully."
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      msg:"Intern Server Error"
      
    })
  }
}

const Staffs = async (req, res) => {
  try {
    const data = await adminServices.getAllStaffs()
    // console.log(data)
    if (!data) {
      return res.status(400).json({
        status: false,
        msg:"Fail To fetch All Data"
      })
    }

    return res.status(200).json({
      status: true,
      msg: "data retrieved successfuly.",
      data: data.length === 1 ? data[0] : data,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      msg:"Internal server Error"
    })
  }
}
const Staff = async (req,res) => {
  try {
       const { id } = req.params;

       if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({
           status: false,
           msg: "Invalid or No Id Provided.",
         });
    }
    
    const data = await adminServices.getSingleStaffs(id);
    console.log(data)
    if (!data) {
      return res.status(400).json({
        status: false,
        msg: "Fail To fetch Data.",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "data retrieved successfuly.",
      data: data,
    });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        msg: "Internal server Error",
      });
    }
};

const createRole = async (req,res) => {
  
  try {
    const { role_name } = req.body
    if (!role_name) {
      return res.status(400).json({
        status: false,
        msg:"Provide Role name."
      })
    }
    const exist = await Role.findOne({ role_name })
    if (exist) {
      return res.status(400).json({
        status: false,
        msg:"This role is already Exist."
      })
    }

    const role = await adminServices.addRole(role_name)
    if (!role) {
      return res.status(400).json({
        status: false,
        msg:"Fail to create Role."
      })
    }

    return res.status(201).json({
      status: true,
      msg: "Role is created successfully.",
      data:role
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      msg:"Internal Server Error."
    })
  }

}
const editRole = async (req,res) => {
  try {
    const { id } = req.params
  // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        msg:"Invalid id or Not provided"
      })
    }
    const { role_name } = req.body;


    // console.log(role_name)
    if (!role_name) {
      return res.status(400).json({
        status: false,
        msg:"All fields Are reguired."
      })
    }
 const exist = await Role.findOne({ role_name });
 if (exist) {
   return res.status(400).json({
     status: false,
     msg: "This role is already Exist.",
   });
 }
    const updated = await adminServices.updateRole(id,role_name)
    if (!updated) {
      return res.status(400).json({
        status: false,
        msg:"Fail To update"
      })
    }

    return res.status(200).json({
      status: true,
      msg: "Updated successfully.",
      data:updated
    })
   } catch (error) {
     console.log(error);
     return res.status(500).json({
       status: false,
       msg: "Internal Server Error.",
     });
   }
}
const deleteRole = async (req,res) => {
  try {
     const {id}= req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        msg:"ID is not valid or not provided"
      })
    }
    const Isdeleted =await  adminServices.deleteRole(id)
    // console.log(Isdeleted)
    if (!Isdeleted) {
      return res.status(400).json({
        status: false,
        msg:"Fail To delete"
  })
    }
    
    return res.status(200).json({
      status: true,
      msg: "Role is Deleted successfully",
      
    })

   } catch (error) {
     console.log(error);
     return res.status(500).json({
       status: false,
       msg: "Internal Server Error.",
     });
   }
}
const getAllRole = async (req,res) => {
  try {
     
    const data = await adminServices.Roles()
    if (!data) {
      return res.status(404).json({
        status: false,
        msg:"Not Found"
      })
    }
    return res.status(200).json({
      status: true,
      msg: "Retrieved Sucessfully.",
      data:data
    })
   } catch (error) {
     console.log(error);
     return res.status(500).json({
       status: false,
       msg: "Internal Server Error.",
     });
   }
}
const getSIngleRole = async (req,res) => {
  try {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: false,
      msg: "ID is not valid or not provided",
    });
  }

     const data = await adminServices.SingleRole()
     if (!data) {
       return res.status(404).json({
         status: false,
         msg: "Not Found",
       });
     }
     return res.status(200).json({
       status: true,
       msg: "Retrieved Sucessfully.",
       data: data,
     });
     
   } catch (error) {
     console.log(error);
     return res.status(500).json({
       status: false,
       msg: "Internal Server Error.",
     });
   }
} 
  
export default { newStaff, editStaff, deleteStaff,Staff,Staffs,createRole,getAllRole,getSIngleRole, editRole,deleteRole };