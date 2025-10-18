// models/Role.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      enum: [
        "student",
        "sport_office",
        "dept_head",
        "admin",
        "librarian",
        "dormitory_office",
        "book_store_keeper",
        "registrar_office",
        "cafteria",
        "women_affairs",
        "student_loan",
        "college_dean",
        "try",
        "milk"
      ],
    },
  },
  {
    timestamps: true, // tracks createdAt and updatedAt
  }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
