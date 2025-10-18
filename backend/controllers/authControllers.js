import jwt from "jsonwebtoken";
import authService from "../services/authService.js";
console.log(process.env.JWT_SECRET);

const register = async (req, res) => {
  try {
    const {
      full_name,
      university_email,
      student_university_id,
      department,
      //  year_of_study,
      password,
      role,
    } = req.body;
    console.log(req.body);
    if (
      !full_name ||
      !university_email ||
      !student_university_id ||
      !department ||
      !role ||
      !password
    ) {
      return res
        .status(400)
        .json({ status: false, msg: "All fields are reguired." });
    }
    const data = {
      full_name,
      university_email,
      role,
      student_university_id,
      password,
      department,
      /** full_name: "",
    university_email: "",
    role: {
      role_name: "student", // ✅ must match RoleName
    },
    student_university_id: "",
    password: "",
    department: "", */
    };

    const credentialData = { university_email, student_university_id };

    const exist = await authService.ifUserExist(credentialData);
    if (exist) {
      return res.status(409).json({
        status: false,
        msg: "User exist whith this Email or University ID.",
      });
    }
    const user = await authService.registeService(data);
    if (!user) {
      return res.status(400).json({
        status: false,
        msg: "Fail to register.",
      });
    }

    return res.status(201).json({
      status: true,
      msg: "student registered Successfully.",
      data: {
        full_name: user.full_name,
        university_email: user.university_email,
        student_university_id: user.student_university_id,
        department: user.department,
        //  year_of_study: user.year_of_study,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error,.",
    });
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body)

    const { university_email, email, password } = req.body;
    if (!(university_email || email) || !password) {
      return res.status(404).json({
        status: false,
        msg: "All fields required.",
      });
    }
    const data = { university_email, email, password };

    const user = await authService.loginService(data);
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User Not found",
      });
    }
    const payload = {
      userId: user._id,
      useName: user.full_name,
      role_Id: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1H",
    });
    const roleName = user?.role?.role_name || user?.role_id || user?.role || "unknown";
    // console.log("hey", roleName);
    return res.status(201).json({
      status: true,

      //  msg: "student registered Successfully.",
      user: {
        userId: user._id,
        full_name: user.full_name,
        university_email: user.university_email,
        student_university_id: user.student_university_id,
        department: user.department,
        year_of_study: user.year_of_study,
        // role: roleName,
        role: user?.role_id || user?.role?.role_name,
      },
      token,
    });
  } catch (error) {
    //     if (error.message.includes("User not found")) {
    //     return res.status(404).json({ msg: error.message });
    //   }
    //   if (error.message.includes("Incorrect password")) {
    //     return res.status(401).json({ msg: error.message });
    //   }

    //   // For unexpected errors
    //   console.error(error);
    //   res.status(500).json({ msg: "Internal server error" });
    // }
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: error.message || "Server Error.",
    });
  
  };
}

const logout = async (req, res) => {
  const blacklistedTokens = new Set();
  // Get the Authorization header (e.g. "Bearer <token>")
  const authHeader = req.headers.authorization;

  // Extract the token safely
  const token = authHeader && authHeader.split(" ")[1];

  // If no token, return error
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Add token to blacklist
  blacklistedTokens.add(token);

  // Respond success
  res.json({ message: "Logged out successfully" });
};





export default { register, login, logout }
