import mongoose from "mongoose";


const isuedSchema = mongoose.Schema(
  {
    student_name: {
      type: String,
      reguired: true,
    },
    student_Id: {
      type: String, //student_name,student_Id,department,issued_reason,quantity
      reguired: true,
    },
    department: {
      type: String,
      reguired: true,
    },
    issued_reason: {
      type: String,
    },
    quantity: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "with_issues", "cleared"],
      default: "with_issues",
    }
  },
  {
    timestamps: true,
  }
);
 


export const IssuedAtCafeteria = mongoose.model(
  "IssuedAtCafeteria",
  isuedSchema
);
export const IssuedAtSport = mongoose.model("IssuedAtSport", isuedSchema);
export const IssuedAtDormitory = mongoose.model(
  "IssuedAtDormitory",
  isuedSchema
);
export const IssuedAtLibrary = mongoose.model("IssuedAtLibrary", isuedSchema);
export const IssuedAtBookstore = mongoose.model(
  "IssuedAtBookstore",
  isuedSchema
);
export const IssuedAtDeptHead = mongoose.model(
  "IssuedAtDeptHead",
  isuedSchema
);
export const IssuedAtRegistrar = mongoose.model(
  "IssuedAtRegistral",
  isuedSchema
);
export const IssuedAtLoan = mongoose.model("IssuedAtLoan", isuedSchema);
export const IssuedAtCollegeDean = mongoose.model("IssuedAtCollegeDean", isuedSchema);
export const IssuedAtWomenAndYouth = mongoose.model(
  "IssuedAtWomenAndYouth",
  isuedSchema
);