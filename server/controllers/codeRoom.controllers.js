const CodeRoom = require("../models/codeRoom.models");
const User = require("../models/user.models");

const generateCodeNotebook = async (req, res) => {
  const { userId, date, notebookName } = req.body;
  const files = req.files.map((file) => file.path);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let codeRoom = await CodeRoom.findOne({ userId });

    if (!codeRoom) {
      codeRoom = await CodeRoom.create({ userId, notebooks: [] });
    }

    // Check if the notebook exists for the same name
    const existingNotebook = codeRoom.notebooks.find(
      (notebook) => notebook.notebookName === notebookName
      // && notebook.date.toISOString().split("T")[0] === new Date(date).toISOString().split("T")[0]
    );

    if (!existingNotebook) {
      codeRoom.notebooks.push({
        notebookName,
        files,
        date: new Date(date),
      });

      await codeRoom.save();

      return res
        .status(200)
        .json({ message: "Created a new notebook with files" });
    } else {
      return res
        .status(400)
        .json({ message: "There exists a notebook with the same name" });
    }
  } catch (error) {
    console.error("Error in generateCodeNotebook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCodeNotebook = async (req, res) => {
  const notebookId = req.params.notebookId;

  console.log(notebookId);
};

module.exports = { generateCodeNotebook, updateCodeNotebook };

// ! The below code is for updating the files, use it later

// const existingFilenames = existingNotebook.files.map((file) =>
//   file.split("/").pop()
// );
// const newFiles = files.filter(
//   (file) => !existingFilenames.includes(file.split("/").pop())
// );

// if (newFiles.length > 0) {
//   existingNotebook.files.push(...newFiles);
//   await codeRoom.save();
//   return res
//     .status(200)
//     .json({ message: "Added new files to existing notebook" });
// } else {
//   return res
//     .status(200)
//     .json({ message: "No new files added, all filenames already exist" });
