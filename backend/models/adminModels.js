import mongoose from 'mongoose'


const adminSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"], 
    default: "admin",
  },
});
export const Admin = mongoose.model("Admin", adminSchema);