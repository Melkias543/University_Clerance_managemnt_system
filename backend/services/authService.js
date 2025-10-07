
import Student from "../models/studentModel.js"
import bcrypt from "bcrypt"
const ifUserExist = async (data) => {
try {
  
  const { university_email, student_university_id } = data
  
  const user = await Student.findOne({
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
   const { university_email, password } = data
  

    const user = await Student.findOne({ university_email });
// console.log(user)
  if (!user) {
     throw new Error("User Not Found with this Email.")
   }
  const ismatch =  bcrypt.compareSync(password, user.password);

  if (!ismatch) {
    throw new Error("Incorrect Password.")
  }
    return user
} catch (error) {
  console.log(error)
  throw error
} 

}
export default { registeService, ifUserExist, loginService };