import express from "express";
import applicationControllers from "../controllers/applicationControllers.js";
import dormitoryaApplicationControllers from "../controllers/applications/dormitoryaApplicationControllers.js";

import cafteriaApplicationController from "../controllers/applications/cafteriaApplicationControllers.js";
import bookStoreApplicationController from "../controllers/applications/bookstoreApplicationControllers.js";
import collegeDeanApplicationController from "../controllers/applications/collegeDeanApplicationControllers.js";
import departmentHeadApplicationController from "../controllers/applications/departementHeadApplicationControllers.js";
import libraryApplicationController from "../controllers/applications/libraryApplicationControllers.js";
import loanApplicationController from "../controllers/applications/loanApplicationControllers.js";
import registralApplicationController from "../controllers/applications/registralApplicationControllers.js";
import sportApplicationController from "../controllers/applications/sportApplicationControllers.js";
import womenAndYouthAffairsApplicationController from "../controllers/applications/womenAndYoungApplicationControllers.js";
const router = express.Router();

router.post("/apply", applicationControllers.apply);
router.get("/applicants", applicationControllers.getAllAplied);
router.get("/singleAplicant/:id", applicationControllers.getApliedById);
router.get("/getStudentAPLicationStatus", applicationControllers.getApliedstudentAndService);
/*
/clearance/apply/toDormitory
/clearance/apply/toCaffe
/clearance/apply/toBookStore
/clearance/apply/toSport
/clearance/apply/toDeptHead
/clearance/apply/toLibrary
/clearance/apply/toStudLoan
/clearance/apply/toRegistral
/clearance/apply/toCollegeDean
/clearance/apply/toWomenAndYouth
 */
// DORMITORY APPLICATION.
router.post(
  "/apply/toDormitory",
  dormitoryaApplicationControllers.sendDormitoryApplication
);
router.get('/getAllFromDormitory',dormitoryaApplicationControllers.getAllApplication)
router.get(
  "/getSingleFromDormitory/:id",
  dormitoryaApplicationControllers.getSingleDormitoryHeadApplication
);

 router.put(
   "/AproveOrRejectAtDormitory/:id",
   dormitoryaApplicationControllers.aproveOrRejectAtDromitory
 );




//CAFTERIA APPLICTION
router.post(
  "/apply/toCaffe",
  cafteriaApplicationController.sendToCafteriaApplication
);

router.get('/getAllFromCafteria', cafteriaApplicationController.getAllApplication)
router.get('/getSingleFromCaffe/:id', cafteriaApplicationController.getSingleCafteria)

router.put(
  "/AproveOrRejectAtCaffe/:id",
  cafteriaApplicationController.aproveOrRejectAtCafteria
);





//BOOK STORE APPLICATION
router.post(
  "/apply/toBookStore",
  bookStoreApplicationController.sendBookStoreApplication
);
router.get('/getAllfromBookStore', bookStoreApplicationController.getAllApplication)

router.get(
  "/getSingleBookStore/:id",
  bookStoreApplicationController.getSingleBookStore
);
 router.put("/AproveOrRejectAtBookStore/:id",bookStoreApplicationController.aproveOrRejectAtBookStore)






//SPORT BET APPLICATION
router.post(
  "/apply/toSport",
  sportApplicationController.sendToSportApplication
);

router.get('/getAllFromSport', sportApplicationController.getAllApplication)
router.get("/getSingleFromSport/:id", sportApplicationController.getSingleSportApplication)
router.put(
  "/AproveOrRejectAtSport/:id",
sportApplicationController.aproveOrRejectAtSportOfice);




//APPLICATION TO DEPARTMENT HEAD
router.post(
  "/apply/toDeptHead",
  departmentHeadApplicationController.sendToDeptHeadApplication
);

router.get('/getAllFromDeptHead', departmentHeadApplicationController.getAllApplication)
router.get('/getSingleFromDepartmentHead/:id', departmentHeadApplicationController.getSingleDepartmentHeadApplication)
router.put(
  "/AproveOrRejectAtDeptHead/:id",
  departmentHeadApplicationController.aproveOrRejectAtDeptHead
);





// APPLICATION TO LIBRARY
router.post(
  "/apply/toLibrary",
  libraryApplicationController.sendLibraryApplication
);
router.get("/getAllFromLibrary", libraryApplicationController.getAllApplication )
router.get("/getSingleFromLibrary/:id", libraryApplicationController.getSingleLibraryApplication)
router.put(
  "/AproveOrRejectAtLibrary/:id",
  libraryApplicationController.aproveOrRejectAtLibrary
);




//APPLICATION TO STUNENT LOAN
router.post("/apply/toStudLoan", loanApplicationController.sendLoanApplication);

router.get('/getAllFromLoan', loanApplicationController.getAllApplication)
router.get("/getSingleFromLoan/:id", loanApplicationController.getSingleLoanApplication)

router.put(
  "/AproveOrRejectAtLoan/:id",
  loanApplicationController.aproveOrRejectAtLoan
);



//APPILATION TO REGISTERAL OFFICE OR ADMIN
router.post(
  "/apply/toRegistral",
  registralApplicationController.sendToRegistralApplication
);
router.get('/getAllFromRegistral', registralApplicationController.getAllApplication)
router.get('/getSingleFromRegistral/:id', registralApplicationController.getSingleRegistralApplication)
router.put(
  "/AproveOrRejectAtRegistral/:id",
registralApplicationController.aproveOrRejectAtRegistral
);




//APPLICATION TO COLLEGE DEAN
router.post(
  "/apply/toCollegeDean",
  collegeDeanApplicationController.sendCollegeDeanApplication
);
router.get('/getAllFromCollegeDean', collegeDeanApplicationController.getAllApplication)

router.get("/getSingleCollegeDean/:id", collegeDeanApplicationController.getSingleCollegeDeanApplication )
router.put(
  "/AproveOrRejectCollegeDean/:id",
collegeDeanApplicationController.aproveOrRejectAtCollegeDean);



// TO YOUTH AND WOMEN AFFAIRS
router.post(
  "/apply/toWomenAndYouth",
  womenAndYouthAffairsApplicationController.sendWomenAndYouthAffairsApplication
);
router.get(
  "/getAllFromWomenAndYouth",
  womenAndYouthAffairsApplicationController.getAllApplication
);
router.get("/getSingleWomenAndYouth/:id",womenAndYouthAffairsApplicationController.getSingleWomenANdYouthApplication)
router.put(
  "/AproveOrRejectAtWomenAndYouth/:id",

womenAndYouthAffairsApplicationController.aproveOrRejectAtWomenAndYouth);


export default router;
