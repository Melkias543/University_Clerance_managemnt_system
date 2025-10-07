// models/Role.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      enum: [
        "student",
        "admin",
        "librarian",
        "dormitory_office",
        "book_store_keeper",
        "registrar_office",
        "cafeteria",
        "women_affairs",
        "loan",
        "HIT_dean",
      ],
    },
  },
  {
    timestamps: true, // tracks createdAt and updatedAt
  }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
