const Subject = require("../models/Subject");
const Curriculum = require("../models/Curriculum");
const Chapter = require("../models/Chapter");

exports.createSubject = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    const subject = new Subject({
      name,
      code,
      description,
    });

    await subject.save();
    return res.json({
      success: true,
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("curriculum")

      .exec();

    return res.json({
      success: true,
      subjects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateRoleToDev = async (req, res) => {
  try {
    const { subjectId, userId } = req.body;

    const subject = await Subject.findOne({ _id: subjectId });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const isUserAlreadyInAcl = subject.accessControlList.find(
      (user) => user.toString() === userId
    );

    if (isUserAlreadyInAcl) {
      return res.status(400).json({
        success: false,
        message: "User is already in the access control list",
      });
    }

    subject.accessControlList.push(userId);

    await subject.save();

    return res.json({
      success: true,
      message: "User role updated to developer",
      subject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// exports.createCurriculum = async (req, res) => {
//   try {
//     const { chapterData, courseObjectives, books, subjectId } = req.body;

//     const newCurriculum = new Curriculum({
//       chapter: [],
//       courseObjectives,
//       books,
//     });

//     for (const chapterInfo of chapterData) {
//       const newChapter = new Chapter(chapterInfo);
//       newChapter.save();
//       newCurriculum.chapter.push(newChapter);
//     }

//     await newCurriculum.save();

//     res.status(201).json({
//       message: "Curriculum created successfully",
//       curriculum: newCurriculum,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "An error occurred while creating the curriculum",
//       details: error.message,
//     });
//   }
// };

exports.getSingleSubject = async (req, res) => {
  try {
    const subject = await Subject.findOne({ _id: req.params.id })
      .populate("curriculum")
      .populate("chapter")
      .exec();

    return res.json({
      success: true,
      subject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createCurriculum = async (req, res) => {
  try {
    const { educatorId, courseId, chapterData, courseObjectives, books } =
      req.body;

    // Check if the educator exists
    const educator = await Educator.findById(educatorId);
    if (!educator) 
    {
       return res
        .status(404)
        .json({ success: false, message: "Educator not found" });
    }

 

    // Create a new curriculum
    const newCurriculum = new Curriculum({
      chapter: [],
      courseObjectives,
      books,
    });

    // Create chapters and add them to the curriculum
    for (const chapterInfo of chapterData) {
      const newChapter = new Chapter(chapterInfo);
      await newChapter.save();
      newCurriculum.chapter.push(newChapter);
    }

    // Save the new curriculum
    await newCurriculum.save();

    res.status(201).json({
      success: true,
      message: "Curriculum created successfully",
      curriculum: newCurriculum,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the curriculum",
      details: error.message,
    });
  }
};
