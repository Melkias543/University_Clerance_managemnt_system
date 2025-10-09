


const verifyRole =  (...allowedRoles) => {

  // console.log(allowedRoles);

  return async (req, res, next) => {
    
    try {
      const role_name = req.role;
      if (!role_name) {
        return res.status(403).json({
          status: false,
          msg:"role information is Undefined"
        })
      }
      
      
const normalizedRole = role_name.toLowerCase();
const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

if (!normalizedAllowed.includes(normalizedRole)) {
  return res.status(403).json({
    status: false,
    msg: "Unauthorized token.",
  });
}
      console.log(role_name);
      next()

      
    } catch (error) {
      console.log(error)
            res.status(500).json({ message: "Server error" });

    }
    
  }
};

export default verifyRole