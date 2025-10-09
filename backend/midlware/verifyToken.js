import jwt from 'jsonwebtoken'
import Role from '../models/roleModel.js';

const verifyToken =async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log(decoded)
   
    const role = await Role.findById(decoded.role_Id)
    // console.log(role.role_name)
    
 req.full_name = decoded.useName;
 req.role_Id = decoded.role_Id;
 req.role = role.role_name;
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


export default verifyToken