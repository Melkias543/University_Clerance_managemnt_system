// models/clearanceApplications.js
import mongoose from "mongoose";

const clearanceSchema = new mongoose.Schema(
  {
    // service: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "CleranceService",
    // },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    action: {
      type: String,
      enum: ["Approved", "Aproved", "Rejected", "Pending"],
      default: "Pending",
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export const CafeteriaApplication = mongoose.model(
  "CafeteriaApplication",
  clearanceSchema
);

export const DormitoryApplication = mongoose.model(
  "DormitoryApplication",
  clearanceSchema
);

export const LibraryApplication = mongoose.model(
  "LibraryApplication",
  clearanceSchema
);

export const BookStoreApplication = mongoose.model(
  "BookStoreApplication",
  clearanceSchema
);

export const LoanApplication = mongoose.model(
  "LoanApplication",
  clearanceSchema
);

export const RegistralApplication = mongoose.model(
  "RegistralApplication",
  clearanceSchema
);

export const WomenYouthAffairsApplication = mongoose.model(
  "WomenYouthAffairsApplication",
  clearanceSchema
);

export const CollegeDeanApplication = mongoose.model(
  "CollegeDeanApplication",
  clearanceSchema
);

export const SportApplication = mongoose.model(
  "SportApplication",
  clearanceSchema
);

export const DepartmentHeadApplication = mongoose.model(
  "DepartmentHeadApplication",
  clearanceSchema
);
