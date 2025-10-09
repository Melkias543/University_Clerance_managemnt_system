
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    university_email: {
      type: String,
      reguired: true,
      unique:true
    },
    student_university_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      reguired: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // reference to Roles collection
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
