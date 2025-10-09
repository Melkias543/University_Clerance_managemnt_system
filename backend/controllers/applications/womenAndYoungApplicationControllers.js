import mongoose from "mongoose";
import { WomenYouthAffairsApplication } from "../../models/applicationModel.js";
import applicationService from "../../services/applicationService.js";
const sendWomenAndYouthAffairsApplication = async (req, res) => {
  try {
    console.log(req.body.data);

    const {
      full_name,
      university_email,
      university_id,
      department,
      year_batch,
      reason_for_withdrawal,
      clearance_date,
      application_id,
    } = req.body.data;
    const { service, student, approvals } = req.body;

    if (
      !full_name ||
      !university_email ||
      !university_id ||
      !department ||
      !year_batch ||
      !reason_for_withdrawal ||
      !clearance_date ||
      !student ||
      !application_id ||
      !service
    ) {
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
      service,
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
        WomenYouthAffairsApplication,
        forSpecfic
      );

    if (CheckSpecificAppliction) {
      return res.status(400).json({
        status: false,
        msg: "You already applied for this Staff.",
      });
    }
    const sendedAppilicationData =
      await applicationService.sendAppilicationData(
        WomenYouthAffairsApplication,
        data
      );
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
    const data = await applicationService.getALLAplicationPerStaff(
      WomenYouthAffairsApplication
    );
    if (!data) {
      return res.status(400).json({
        status: false,
        msg: "No Data Found.",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Fetched Successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
    });
  }
};

const getSingleWomenANdYouthApplication = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("here",id)
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
      return res.status(400).json({
        status: false,
        msg: "Invalid service ID or ID is Not provided",
      });
    }
    const data = await applicationService.getSingleAplication(
      WomenYouthAffairsApplication,
      id
    );
    if (!data) {
      return res.status(400).json({
        status: false,
        msg: "No data Found to Fetch.",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Data is fetched successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
    });
  }
};

const aproveOrRejectAtWomenAndYouth = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
const office = "WomenYouth_affairs";
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
      WomenYouthAffairsApplication,
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
  sendWomenAndYouthAffairsApplication,
  getAllApplication,
  getSingleWomenANdYouthApplication,
  aproveOrRejectAtWomenAndYouth,
};
