import applicationService from "../services/applicationService.js";
const apply = async (req, res) => {
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
    } = req.body;

    if (
      !full_name ||
      !university_email ||
      !university_id ||
      !department ||
      !year_batch ||
      !reason_for_withdrawal ||
      !clearance_date ||
      !student
    ) {
      return res.status(400).json({
        msg: false,
        msg: "All fields are reguired",
      });
    }

    const credentialData = { university_id, university_email };
    const IfRegistered = await applicationService.checkIfExistRegistered(
      credentialData
    );

    if (!IfRegistered) {
      return res.status(404).json({
        status: false,
        msg: "You have to registered as member to apply for clearance.",
      });
    }
    const credentialDataIfAplied = { university_id, student,university_email };

    const checkIfExist = await applicationService.checkIfApplied(
      credentialDataIfAplied
    );
    if (checkIfExist) {
      return res.status(404).json({
        status: false,
        msg: "You You already applied for clearence whith this Email or Id.",
      });
    }

    const data = {
      full_name,
      university_email,
      university_id,
      student,
      department,
      year_batch,
      reason_for_withdrawal,
      clearance_date,
    };

    const appliedUser = await applicationService.ToApply(data);

    if (!appliedUser) {
      return res.status(400).json({
        status: false,
        msg: "Your Application is failed.",
      });
    }

    return res.status(200).json({
      status: false,
      msg: "You can proceed Now For further application.",
      data: appliedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Server Error",
      error: error,
    });
  }
};


export default {apply}