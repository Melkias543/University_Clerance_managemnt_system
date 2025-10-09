import mongoose from "mongoose";

const staffSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      reguired: true,
    },
    email: {
      type: String,
      reguired: true,
      unique: true,
    },
    // positon_name: { 
    //   type: String,
    //   reguired: true,
    // },
    salary: {
      type: Number,
      required: true,
    },
    hired_date: {
      type: Date,
      reguired: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      reguired: true,
    },
  },
  {
    timestaps: true,
  }
);

export const Staff = mongoose.model('Staff', staffSchema)