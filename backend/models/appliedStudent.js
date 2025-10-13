import mongoose from "mongoose";

const clearanceApplicationSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    university_email: {
      type: String,
      required: true,
      unique: true, // can apply multiple times, so not unique
    },
    university_id: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    year_batch: {
      type: String,
      required: true,
      enum: [
        "First Year",
        "Second Year",
        "Third Year",
        "Fourth Year",
        "Sixth Year",
        "Seventh Year",
        "Eighth Year",
      ],
    },
    reason_for_withdrawal: {
      type: String,
      required: true,
    },
    clearance_date: {
      type: Date,
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    approvals: [
      {
        office: {
          type: String,
          enum: [
            "Library",
            "Dormitory",
            "Cafeteria",
            "Registral",
            "College_Dean",
            "Book_Store",
            "departmentHead",
            "Student_Loan",
            "WomenYouth_affairs",
            "Sport_office",
          ],
          staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
        },
        status: {
          type: String,
          enum: ["Aprove", "Aproved", "Rejected", "Pending"],
          default: "Pending",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Apply = mongoose.model(
  "ClearanceApplication",
  clearanceApplicationSchema
);
