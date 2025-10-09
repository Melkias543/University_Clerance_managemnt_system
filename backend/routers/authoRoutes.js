import express from 'express';
import authController from '../controllers/authControllers.js';
import Role from '../models/roleModel.js';
import verifyToken from '../midlware/verifyToken.js';
import verifyRole from '../midlware/verifyRole.js';

const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/get", (req,res) => {
  res.json({msg:'From get method'})
});

router.post("/post", verifyToken, verifyRole('student'), (req, res) => {
  const { full_name, role_Id, role } = req;

  // console.log(full_name, role_Id, role)
  res.json({ msg: "from post student" });
});
router.post("/role",  async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({ message: "Role name is required" });
    }

    // check if role already exists
    const existing = await Role.findOne({ role_name });
    if (existing) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await Role.create({ role_name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;