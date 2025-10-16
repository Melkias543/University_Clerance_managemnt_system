import { DormitoryApplication } from "../models/applicationModel.js";

import { Apply } from "../models/appliedStudent.js";
import Student from "../models/studentModel.js";
const checkIfExistRegistered = async (data) => {
  try {
    const { university_id, university_email } = data;
    const user = await Student.findOne({
      $or: [{ university_id }, { university_email }],
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkIfApplied = async (data) => {
  try {
    const { university_id, university_email, student } = data;
    const user = await Apply.findOne({
      $or: [{ university_id }, { university_email }, { student }],
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const ToApply = async (data) => {
  try {
    const {
      full_name,
      university_email,
      university_id,
      department,
      year_batch,
      reason_for_withdrawal,
      clearance_date,
      student,
    } = data;

    const userApplied = await Apply.create({
      full_name,
      university_email,
      university_id,
      department,
      year_batch,
      reason_for_withdrawal,
      clearance_date,
      student,
    });

    return userApplied;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const CheckSpecificAppliction = async (checkModelmodel, data) => {
  try {
    const { student, university_email, service } = data;
    const user = await checkModelmodel.findOne({
      $or: [{ student }, { university_email }],
    });
    console.log("its from user checking", user);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendAppilicationData = async (model, data) => {
  try {
    const {
      student,
      full_name,
      university_email,
      university_id,
      department,
      year_batch,
      reason_for_withdrawal,
      clearance_date,
      application_id,
      approvals,
      // service,
    } = data;

    const applied = await model.create({
      // service,
      student,
      data: {
        full_name,
        university_email,
        university_id,
        department,
        year_batch,
        reason_for_withdrawal,
        clearance_date,
        application_id,
        approvals,
      },
    });
    return applied;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Staff based
const getALLAplicationPerStaff = async (model) => {
  try {
    const dataPerStaff = await model
      .find()
      .populate("student")
      // .populate("application_id");
  
    //
    const data = dataPerStaff.map((item) => ({
      id: item._id,
      action: item.action,
      submitted_at: item.createdAt,
      student: {
        id: item.student._id,
        student_university_id: item.student.student_university_id,
        full_name: item.student.full_name,
        university_email: item.student.university_email,
        department: item.student.department,
        role: item.student.role,
      },
      // service: {
      //   id: item.service._id,
      //   title: item.service.title,
      //   description: item.service.description,
      // },
      withdrawal_info: {
        id: item.data._id,
        full_name: item.data.full_name,
        university_email: item.data.university_email,
        university_id: item.data.university_id,
        department: item.data.department,
        year_batch: item.data.year_batch,
        reason: item.data.reason_for_withdrawal,
        clearance_date: item.data.clearance_date,
        application_id: item.data.application_id,
      },
    }));
    // console.log(data)
    return data;
    // return dataPerStaff
  } catch (error) {
    console.log(error);
  }
};

const getSingleAplication = async (model, student) => {
  try {
    const data = await model.findOne({ student });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const AproveOrRejectLAplication = async (
  model,
  student,
  aprovedOrRejectionData,
  office
) => {
  try {
  
    
    const updatedOfficeAction = await model.findOneAndUpdate(

      { student },
      {
        $set: { action: aprovedOrRejectionData },
      },
      { new: true, runValidators: true }
    );
console.log(updatedOfficeAction)
    if (updatedOfficeAction) {
      const updatedClearance = await Apply.findOneAndUpdate(
        { student },
        {
          $push: {
            approvals: {
              office,
              status: aprovedOrRejectionData,
              // staffId: aprovedOrRejectionData,Staff Id will be added here
            },
          },
          // $set: { status: aprovedOrRejectionData },
        },
        { new: true, runValidators: true }
      );
      const data = { updatedOfficeAction, updatedClearance };
      // console.log(data)
      return data;
    }

    // const data = { rejectedorAproved, addAproved };
    // return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  checkIfExistRegistered,
  ToApply,
  checkIfApplied,
  sendAppilicationData,
  CheckSpecificAppliction,
  getALLAplicationPerStaff,
  getSingleAplication,
  AproveOrRejectLAplication,
};
