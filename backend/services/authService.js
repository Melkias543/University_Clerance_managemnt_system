
import { Staff } from "../models/staffModels.js";
import Student from "../models/studentModel.js"
import bcrypt from "bcrypt"
const ifUserExist = async (data) => {
try {
  let user =null
  const { university_email,email, student_university_id } = data
  
 user = await Student.findOne({
   $or: [{ university_email }, { student_university_id }],
 });


  
  
  
    return user; 

} catch (error) {
  console.log(error)
  return error
  
}
}


const registeService = async (data) => {
  
try {
  


  const {  full_name,
    university_email,
     role,
     student_university_id,
     password,
     department,
     } = data
const saltRounds =10
const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // password = hashedPassword;
  console.log(hashedPassword);
  const student = await Student.create({
    full_name,
    university_email,
    student_university_id,
    password: hashedPassword,
    department,
    
    role,
  });
 return student
  
} catch (error) {
  console.log(error)
  throw error
}
}

const loginService = async (data) => {
  try {
  let user = null
   const { university_email,email, password } = data
  

     user = await Student.findOne({ university_email }).populate("role");;
// console.log(user)
  if (!user) {
      user = await Staff.findOne({ email }).populate('role_id');
  }
    if (!user) {
    return null
  }
  // if (!user) {
  //   throw new Error("User Not Found with this Email.");
  //   }
    let isMatch=null
 if (user.password.startsWith("$2b$")) {
   isMatch = bcrypt.compareSync(password, user.password);
 } else {
   // Plain text password
   isMatch = password === user.password;
    }
    // console.log(user)
    return user
} catch (error) {
  console.log(error)
  throw error
} 

}
export default { registeService, ifUserExist, loginService };