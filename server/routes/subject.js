const express = require("express");
const router = express.Router();

const {
  createSubject,
  getAllSubjects,
  updateRoleToDev,
  createCurriculum,
  getSingleSubject,
} = require("../controllers/subjectController");

router.post("/createSubject", createSubject);
router.post("/createCurriculum", createCurriculum);
router.get("/getAllSubjects", getAllSubjects);
router.get("/getSingleSubject/:id", getSingleSubject);
router.post("/updateRoleToDev", updateRoleToDev);


module.exports = router;
