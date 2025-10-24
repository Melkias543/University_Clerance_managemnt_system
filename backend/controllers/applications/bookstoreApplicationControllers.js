import mongoose from "mongoose";
import { BookStoreApplication } from "../../models/applicationModel.js";
import applicationService from "../../services/applicationService.js";
const sendBookStoreApplication = async (req, res) => {
  try {
    console.log("Book store",req.body.data);

  const body = req.body.data || req.body;
  const {
    full_name,
    university_email,
    university_id,
    department,
    year_batch,
    reason_for_withdrawal,
    clearance_date,
    application_id,
    student,
    approvals,
  } = body;

    if (
      !full_name ||
      !university_email ||
      !university_id ||
      !department ||
      !year_batch ||
      !reason_for_withdrawal ||
      !clearance_date ||
      !student ||
      !application_id    ) {
      return res.status(400).json({
        status: false,
        msg: "All fields reguired",
      });
    }

    const data = {
      full_name,
      university_email,
      university_id,
      department,
      year_batch,
      reason_for_withdrawal,
      clearance_date,
      student,
      application_id,
      approvals,
      // service,
    };
    const credentialData = { university_id, university_email };

    const checkIfExist = await applicationService.checkIfApplied(
      credentialData
    );
    if (!checkIfExist) {
      return res.status(404).json({
        status: false,
        msg: "To proceed you have to apply for clearnce.",
      });
    }
const forSpecfic = { student, university_email };

    const CheckSpecificAppliction =
      await applicationService.CheckSpecificAppliction(
        BookStoreApplication,
        forSpecfic
      );

    if (CheckSpecificAppliction) {
      return res.status(400).json({
        status: false,
        msg: "You already applied for this Staff.",
      });
    }
    const sendedAppilicationData =
      await applicationService.sendAppilicationData(BookStoreApplication, data);
    if (!sendedAppilicationData) {
      return res.status(400).json({
        status: false,
        msg: "Your appliction is Fail.",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Your application is submitted successfully.",
      data: sendedAppilicationData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Server Error.",
      error: error,
    });
  }
};


const getAllApplication = async (req, res) => {
  try {
    
    const data = await applicationService.getALLAplicationPerStaff(BookStoreApplication)
    if (!data) {
      return res.status(400).json({
        status: false,
        msg:"No Data Found."
      })
    }

    return res.status(200).json({
      status: true,
      msg: "Fetched Successfully.",
      data:data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      msg:"Internal Server Error."
    })
  }
}

const getSingleBookStore = async (req, res)=>{
  try {
    const {id} = req.params
    console.log("here",id)
if (!mongoose.Types.ObjectId.isValid(id) || !id) {
  return res.status(400).json({
    status: false,
    msg: "Invalid service ID or ID is Not provided",
  });
}
    const data = await applicationService.getSingleAplication(
      BookStoreApplication,
      id
    );
    if (!data) {
      return res.status(400).json({
        status: false,
        msg:"No data Found to Fetch."
      })
    }

    return res.status(200).json({
      status: true,
      msg: "Data is fetched successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error)
     return res.status(500).json({
       status: false,
       msg: "Internal Server Error.",
     });

  }
}

const aproveOrRejectAtBookStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status,id);
       const office = "Book_Store";
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
      return res.status(400).json({
        status: false,
        msg: "Invalid service ID or ID is Not provided",
      });
    }
    if (!status) {
      return res.status(400).json({
        status: false,
        msg:"All fields are required to update."
      })
    }
  
    const data = await applicationService.AproveOrRejectLAplication(
      BookStoreApplication,
      id,
      status,
      office
    );
    if (!data) {
      return res.status(400).json({
        status: false,
        msg:"Fail To update"
      })
    }

    return res.status(200).json({
      status: true,
      msg: "Action is Submitted successfully.",
      data:data
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: false,
      msg:"Internal Server Error"
    })
  }

}
export default {
  sendBookStoreApplication,
  getAllApplication,
  getSingleBookStore,
  aproveOrRejectAtBookStore,
};

