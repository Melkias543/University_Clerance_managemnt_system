import mongoose, { model } from "mongoose";
import { IssuedAtLibrary } from "../../models/IssuedStudent.js";
import issuedservice from "../../services/issuedservice.js";

// Create issued record
const createIssuedRecordLibrary = async (req, res) => {
  try {
    const { student_name, student_Id, department, issued_reason, quantity } =
      req.body;

    if (!student_name || !student_Id || !department) {
      return res.status(400).json({
        status: false,
        msg: "There are important fields missing (student_name, student_Id, department).",
      });
    }
    const data = {
      student_name,
      student_Id,
      department,
      issued_reason,
      quantity,
    };
    const issued = await issuedservice.createIssued(data, IssuedAtLibrary);
    if (!issued) {
      return res.status(400).json({
        status: false,
        msg: "Fail To Record.",
      });
    }
    return res.status(201).json({
      status: true,
      message: "Issued recorded At Library created",
      data: issued,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// Get all issued recordLibrarys for department
const getIssuedRecordLibrarys = async (req, res) => {
  try {
    const issuedList = await issuedservice.getAllIssued(IssuedAtLibrary);
    if (!issuedList) {
      return res.status(400).json({
        status: false,
        msg: "Fail to retrieve data.",
      });
    }
    res
      .status(200)
      .json({ status: true, msg: "Retrieved successfully ", data: issuedList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
      error: error,
    });
  }
};
const getSingleIssuedLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        msg: "Proveide Only Valid Id",
      });
    }

    const data = await issuedservice.singleIsuedStudent(id, IssuedAtLibrary);
    if (!data) {
      return res.status(404).json({
        status: false,
        msg: "Data Not Found",
      });
    }

    return res.status(200).json({
      status: false,
      msg: "retrieved successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
      error: error,
    });
  }
};
// Update issued recordLibrary
const updateIssuedRecordLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        msg: "Proveide Only Valid Id",
      });
    }

    const { student_name, student_Id, department, issued_reason, quantity } =
      req.body;

    if (!student_name || !student_Id || !department) {
      return res.status(400).json({
        status: false,
        msg: "There are important fields missing (student_name, student_Id, department).",
      });
    }
    const data = {
      student_name,
      student_Id,
      department,
      issued_reason,
      quantity,
    };
    const updated = await issuedservice.updateIssued(id, data, IssuedAtLibrary);
    if (!updated) {
      return res.status(400).json({
        status: false,
        msg: "Fail To Update.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
      error: error,
    });
  }
};

// Delete issued recordLibrary
const deleteIssuedRecordLibrary = async (req, res) => {
  try {
    const { id } = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({
         status: false,
         msg: "Proveide Only Valid Id",
       });
     }
    const deleted = await issuedservice.deleteIssued(IssuedAtLibrary, id);
    if (!deleted) {
      return res.status(400).json({
        status: false,
        msg: "Fail To Delete.",
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const updateStatusIssuedLibrary = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: false,
      msg: "Proveide Only Valid Id",
    });
  }
  const { status } = req.body
  if (!status) {
    return res.status(400).json({
      status: false,
      msg:"Status Is required"
    })
  }

  const aproved = await issuedservice.aproveIsue(IssuedAtLibrary, id, status);
  if (!aproved) {
    return res.status(400).json({
      status: false,
      msg:"Fail To Aprove"
    })
  }

  return res.status(200).json({
    status: true,
    msg: "Aproved Successfully.",
    data:aproved
  })
};

export default {
  createIssuedRecordLibrary,
  getIssuedRecordLibrarys,
  updateIssuedRecordLibrary,
  deleteIssuedRecordLibrary,
  getSingleIssuedLibrary,
  updateStatusIssuedLibrary,
};


///controllerIsuedLibrary.js