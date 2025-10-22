


// ✅ Create issued record
const createIssued = async (data, model) => {
  try {
    const created = await model.create(data);
    return created
  } catch (error) {
    console.log(error)
    throw error
  }

}

// ✅ Get all issued records
 const getAllIssued = async (model) => {
 
   try {
     const data = model.find();
     return data
} catch (error) {
  console.log(error)
  throw error
}
};
 
//get Single Issued Student.
 
const singleIsuedStudent = async(id,model) => {
  try {
    //  console.log(id,model)
    const isude = await model.findOne({ _id: id });
    console.log(isude);
     return isude
   } catch (error) {
     console.log(error)
     throw error
   }
 }

// ✅ Update issued record (by id)
 const updateIssued = async ( id,updateddata, model) => {

  try {
     const data = await model.findByIdAndUpdate({ _id: id }, updateddata, {
       new: true,
     });
     return data;
  } catch (error) {
    console.log(error)
    throw error
  }
};


// ✅ Delete issued record
 const deleteIssued = async (model, id) => {
 try {
   return await model.findByIdAndDelete(id);
 } catch (error) {
   console.log(error)
  throw error
 }
}
const aproveIsue = async (model,id,status) => {
  try {
        const data = await model.findByIdAndUpdate(
          { _id: id },
          { status :status},
          {
            new: true,
          }
        );
        return data;
  } catch (error) {
    console.log(error)
    throw error
  }
}
export default {
  createIssued,
  updateIssued,
  getAllIssued,
  deleteIssued,
  singleIsuedStudent,
  aproveIsue,
};