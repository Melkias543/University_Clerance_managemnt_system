import mongoose from "mongoose";
import clearenceService from "../services/clearanceService.js";

const addNewService = async (req, res) => {
  try {
    const { description, title } = req.body;

    if (!description || !title) {
      return res.status(400).json({
        status: false,
        msg: "All fields are reguired.",
      });
    }

    const CheckIfThisServicesExist =
      await clearenceService.CheckIfThisServicesExist(title);
    if (CheckIfThisServicesExist) {
      return res.status(409).json({
        status: false,
        msg: "This Services already Exist.",
      });
    }

    const cratedService = await clearenceService.createService(
      description,
      title
    );

    if (!cratedService) {
      return res.status(400).json({
        status: false,
        msg: "Failed, to add new Serivice",
      });
    }

    return res.status(201).json({
      status: true,
      msg: "New Service is Added.",
      data: cratedService,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      msg: "Server Error",
    });
  }
};
const getAllService = async (req, res) => {
  try {
    const allService = await clearenceService.allService();
    if (!allService) {
      return res.status(404).json({
        status: false,
        msg: "Service Not Found",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "all Sercice Is Sent Successfully.",
      data: allService,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
    });
  }
};
const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
      return res.status(400).json({
        status: false,
        msg: "Invalid service ID or ID is Not provided",
      });
    }
    const service = await clearenceService.getService(id);
    if (!service) {
      return res.status(404).json({
        status: false,
        msg: "Data not Found",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Data is fetched Successfully.",
      data: service,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
      return res.status(400).json({
        status: false,
        msg: "Invalid service ID or ID is Not provided",
      });
    }

    const IsDeleted = await clearenceService.deleteCleranceService(id);

    if (!IsDeleted) {
      return res.status(400).json({
        status: false,
        msg: "Fail To Delete.",
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: false,
        msg: "All fields are Reguired.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
      return res.status(400).json({
        status: false,
        msg: "Invalid service ID or ID is Not provided",
      });
    }

    const Updated = await clearenceService.UpdateService(
      id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!Updated) {
      return res.status(400).json({
        status: false,
        msg: "Fail To Update.",
      });
    }
    return res.status(400).json({
      status: true,
      msg: "Updated Successfully.",
      data: Updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Internal Server Error.",
    });
  }
};
export default {
  addNewService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
