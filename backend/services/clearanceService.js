import { CleranceService } from "../models/clearence_serviceModel.js"

const CheckIfThisServicesExist = async (data) => {
  try {
    
    const exist = await CleranceService.findOne({data})
    return exist


  } catch (error) {
    console.log(error)
    throw error
  }
}


const createService = async (description, title) => {
  try {
    const service = await CleranceService.create({description, title});
    
    return service

  } catch (error) {
    console.log(error);
    throw error;
  }
};


const allService = async() => {
  try {
    const service = await CleranceService.find();
    return service
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getService = async(_id) => {
  try {
    
    const service = await CleranceService.findById(_id)

    return service
    
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteCleranceService = async(_id) => {
  try {
    const DeletedData = await CleranceService.findByIdAndDelete(_id)
    return DeletedData
  } catch (error) {
    console.log(error)
    throw error
  }
}

const UpdateService =async (_id,title,description) => {
  try {
    
    const updatedData = await CleranceService.findByIdAndUpdate(_id, title, description)
    
    return updatedData
  } catch (error) {
    console.log(error)
    throw error
  }
}
export default {
  CheckIfThisServicesExist,
  createService,
  allService,
  getService,
  deleteCleranceService,
  UpdateService,
};