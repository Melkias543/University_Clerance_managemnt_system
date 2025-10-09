import mongoose from "mongoose";

const cleranceServiceSchema = mongoose.Schema({
  title: {
    type: String,
    reguired: true,
    unique: true
},
  description: {
    type: String,
    reguired: true,
    
  },
},
   { timestamps: true }
)

export const CleranceService = mongoose.model("CleranceService",cleranceServiceSchema);