import mongoose, { model } from "mongoose";
import { IssuedAtLoan } from "../../models/IssuedStudent.js";
import issuedservice from "../../services/issuedservice.js";

// Create issued record
const createIssuedRecordAtLoan = async (req, res) => {
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
    const issued = await issuedservice.createIssued(data, IssuedAtLoan);
    if (!issued) {
      return res.status(400).json({
        status: false,
        msg: "Fail To Record.",
      });
    }
    return res.status(201).json({
      status: true,
      message: "Issued recorded At Loan created",
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

// Get all issued recordAtLoans for department
const getIssuedRecordAtLoans = async (req, res) => {
  try {
    const issuedList = await issuedservice.getAllIssued(IssuedAtLoan);
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
const getSingleIssuedAtLoan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        msg: "Proveide Only Valid Id",
      });
    }

    const data = await issuedservice.singleIsuedStudent(id, IssuedAtLoan);
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
// Update issued recordAtLoan
const updateIssuedRecordAtLoan = async (req, res) => {
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
    const updated = await issuedservice.updateIssued(id, data, IssuedAtLoan);
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

// Delete issued recordAtLoan
const deleteIssuedRecordAtLoan = async (req, res) => {
  try {
    const { id } = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({
         status: false,
         msg: "Proveide Only Valid Id",
       });
     }
    const deleted = await issuedservice.deleteIssued(IssuedAtLoan, id);
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

const updateStatusIssuedAtLoan = async(req, res) => {
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

  const aproved = await issuedservice.aproveIsue(IssuedAtLoan, id, status);
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
  createIssuedRecordAtLoan,
  getIssuedRecordAtLoans,
  updateIssuedRecordAtLoan,
  deleteIssuedRecordAtLoan,
  getSingleIssuedAtLoan,
  updateStatusIssuedAtLoan,
};


///controllerIsuedAtBookstore.js