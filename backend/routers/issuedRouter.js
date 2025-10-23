import express from "express";
import issuedBookStoreController from "../controllers/isuedController/controllerIsuedAtBookstore.js";
import issuedCafeteriaController from "../controllers/isuedController/controllerIsuedAtCaffe.js";
import issuedDormitoryController from "../controllers/isuedController/controllerIsuedAtDormitory.js";
import issuedRegistrarController from "../controllers/isuedController/controllerIsuedAtRegistral.js";
import issuedStudentLoanController from "../controllers/isuedController/controllerIsuedAtStudentLoan.js";
import issuedWomenYouthController from "../controllers/isuedController/controllerIsuedAtWomenAndYouth.js";
import issuedCollegeDeanController from "../controllers/isuedController/controllerIsuedAtCollgeDean.js";
import issuedDepartmentHeadController from "../controllers/isuedController/controllerIsuedAtDeptHead.js";
import issuedLibraryController from "../controllers/isuedController/controllerIsuedAtLibrary.js";
import issuedSportController from "../controllers/isuedController/controllerIsuedAtSport.js";

const router = express.Router();

//Student issued at Book Store Application
router.post(
  "/IssueSaveatBookstore",
  issuedBookStoreController.createIssuedRecordAtBookStore
);
router.get(
  "/getAllIsueFromBokStore",
  issuedBookStoreController.getIssuedRecordAtBookStores
);
router.get(
  "/getSingleIsueFromBokStore/:id",
  issuedBookStoreController.getSingleIssuedAtBookStore
);
router.put(
  "/updateIssuedAtBookStore/:id",
  issuedBookStoreController.updateIssuedRecordAtBookStore
);
router.delete(
  "/deleteIssuedAtBookstore/:id",
  issuedBookStoreController.deleteIssuedRecordAtBookStore
);

router.put(
  "/aproveStatusAtBookStore/:id",
  issuedBookStoreController.updateStatusIssuedAtBookStore
);

// ======================= ☕ CAFETERIA =======================
router.post(
  "/IssueSaveatCafeteria",
  issuedCafeteriaController.createIssuedRecordAtCaffe
);
router.get(
  "/getAllIsueFromCafeteria",
  issuedCafeteriaController.getIssuedRecordAtCaffes
);
router.get(
  "/getSingleIsueFromCafeteria/:id",
  issuedCafeteriaController.getSingleIssuedAtCaffe
);
router.put(
  "/updateIssuedAtCafeteria/:id",
  issuedCafeteriaController.updateIssuedRecordAtCaffe
);
router.delete(
  "/deleteIssuedAtCafeteria/:id",
  issuedCafeteriaController.deleteIssuedRecordAtCaffe
);
router.put(
  "/aproveStatusAtCafeteria/:id",
  issuedCafeteriaController.updateStatusIssuedAtCaffe
);

// ======================= 🏠 DORMITORY =======================
router.post(
  "/IssueSaveatDormitory",
  issuedDormitoryController.createIssuedRecordDormitory
);
router.get(
  "/getAllIsueFromDormitory",
  issuedDormitoryController.getIssuedRecordDormitorys
);
router.get(
  "/getSingleIsueFromDormitory/:id",
  issuedDormitoryController.getSingleIssuedDormitory
);
router.put(
  "/updateIssuedAtDormitory/:id",
  issuedDormitoryController.updateIssuedRecordDormitory
);
router.delete(
  "/deleteIssuedAtDormitory/:id",
  issuedDormitoryController.deleteIssuedRecordDormitory
);
router.put(
  "/aproveStatusAtDormitory/:id",
  issuedDormitoryController.updateStatusIssuedDormitory
);

// ======================= 🧾 REGISTRAl =======================
router.post(
  "/IssueSaveatRegistral",
  issuedRegistrarController.createIssuedRecordAtRegistral
);
router.get(
  "/getAllIsueFromRegistral",
  issuedRegistrarController.getIssuedRecordAtRegistrals
);
router.get(
  "/getSingleIsueFromRegistral/:id",
  issuedRegistrarController.getSingleIssuedAtRegistral
);
router.put(
  "/updateIssuedAtRegistral/:id",
  issuedRegistrarController.updateIssuedRecordAtRegistral
);
router.delete(
  "/deleteIssuedAtRegistral/:id",
  issuedRegistrarController.deleteIssuedRecordAtRegistral
);
router.put(
  "/aproveStatusAtRegistral/:id",
  issuedRegistrarController.updateStatusIssuedAtRegistral
);

// ======================= 💰 STUDENT LOAN =======================
router.post(
  "/IssueSaveatStudentLoan",
  issuedStudentLoanController.createIssuedRecordAtLoan
);
router.get(
  "/getAllIsueFromStudentLoan",
  issuedStudentLoanController.getIssuedRecordAtLoans
);
router.get(
  "/getSingleIsueFromStudentLoan/:id",
  issuedStudentLoanController.getSingleIssuedAtLoan
);
router.put(
  "/updateIssuedAtStudentLoan/:id",
  issuedStudentLoanController.updateIssuedRecordAtLoan
);
router.delete(
  "/deleteIssuedAtStudentLoan/:id",
  issuedStudentLoanController.deleteIssuedRecordAtLoan
);
router.put(
  "/aproveStatusAtStudentLoan/:id",
  issuedStudentLoanController.updateStatusIssuedAtLoan
);

// ======================= 👩‍🎓 WOMEN & YOUTH AFFAIR =======================
router.post(
  "/IssueSaveatWomenYouth",
  issuedWomenYouthController.createIssuedRecordAtWomenAndYoth
);
router.get(
  "/getAllIsueFromWomenYouth",
  issuedWomenYouthController.getIssuedRecordAtWomenAndYoths
);
router.get(
  "/getSingleIsueFromWomenYouth/:id",
  issuedWomenYouthController.getSingleIssuedAtWomenAndYoth
);
router.put(
  "/updateIssuedAtWomenYouth/:id",
  issuedWomenYouthController.updateIssuedRecordAtWomenAndYoth
);
router.delete(
  "/deleteIssuedAtWomenYouth/:id",
  issuedWomenYouthController.deleteIssuedRecordAtWomenAndYoth
);
router.put(
  "/aproveStatusAtWomenYouth/:id",
  issuedWomenYouthController.updateStatusIssuedAtWomenAndYoth
);

// ======================= 🎓 COLLEGE DEAN =======================
router.post(
  "/IssueSaveatCollegeDean",
  issuedCollegeDeanController.createIssuedRecordAtCollegeDean
);
router.get(
  "/getAllIsueFromCollegeDean",
  issuedCollegeDeanController.getIssuedRecordAtCollegeDeans
);
router.get(
  "/getSingleIsueFromCollegeDean/:id",
  issuedCollegeDeanController.getSingleIssuedAtCollegeDean
);
router.put(
  "/updateIssuedAtCollegeDean/:id",
  issuedCollegeDeanController.updateIssuedRecordAtCollegeDean
);
router.delete(
  "/deleteIssuedAtCollegeDean/:id",
  issuedCollegeDeanController.deleteIssuedRecordAtCollegeDean
);
router.put(
  "/aproveStatusAtCollegeDean/:id",
  issuedCollegeDeanController.updateStatusIssuedAtCollegeDean
);

// ======================= 🏫 DEPARTMENT HEAD =======================
router.post(
  "/IssueSaveatDepartmentHead",
  issuedDepartmentHeadController.createIssuedRecordDeptHead
);
router.get(
  "/getAllIsueFromDepartmentHead",
  issuedDepartmentHeadController.getIssuedRecordDeptHeads
);
router.get(
  "/getSingleIsueFromDepartmentHead/:id",
  issuedDepartmentHeadController.getSingleIssuedDeptHead
);
router.put(
  "/updateIssuedAtDepartmentHead/:id",
  issuedDepartmentHeadController.updateIssuedRecordDeptHead
);
router.delete(
  "/deleteIssuedAtDepartmentHead/:id",
  issuedDepartmentHeadController.deleteIssuedRecordDeptHead
);
router.put(
  "/aproveStatusAtDepartmentHead/:id",
  issuedDepartmentHeadController.updateStatusIssuedDeptHead
);

// ======================= 📖 LIBRARY =======================
router.post(
  "/IssueSaveatLibrary",
  issuedLibraryController.createIssuedRecordLibrary
);
router.get(
  "/getAllIsueFromLibrary",
  issuedLibraryController.getIssuedRecordLibrarys
);
router.get(
  "/getSingleIsueFromLibrary/:id",
  issuedLibraryController.getSingleIssuedLibrary
);
router.put(
  "/updateIssuedAtLibrary/:id",
  issuedLibraryController.updateIssuedRecordLibrary
);
router.delete(
  "/deleteIssuedAtLibrary/:id",
  issuedLibraryController.deleteIssuedRecordLibrary
);
router.put(
  "/aproveStatusAtLibrary/:id",
  issuedLibraryController.updateStatusIssuedLibrary
);

// ======================= ⚽ SPORT OFFICE =======================
router.post(
  "/IssueSaveatSport",
  issuedSportController.createIssuedRecordAtSport
);
router.get(
  "/getAllIsueFromSport",
  issuedSportController.getIssuedRecordAtSports
);
router.get(
  "/getSingleIsueFromSport/:id",
  issuedSportController.getSingleIssuedAtSport
);
router.put(
  "/updateIssuedAtSport/:id",
  issuedSportController.updateIssuedRecordAtSport
);
router.delete(
  "/deleteIssuedAtSport/:id",
  issuedSportController.deleteIssuedRecordAtSport
);
router.put(
  "/aproveStatusAtSport/:id",
  issuedSportController.updateStatusIssuedAtSport
);

export default router;
