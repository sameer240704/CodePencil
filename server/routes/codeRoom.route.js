const express = require("express");
const { generateCodeNotebook } = require("../controllers/codeRoom.controllers");
const upload = require("../middlewares/multer.middleware");
const { updateCodeNotebook } = require("../controllers/codeRoom.controllers");

const router = express.Router();

router.get("/users/notebook/:notebookId", updateCodeNotebook);
router.post(
  "/users/code-history",
  upload.array("files", 10),
  generateCodeNotebook
);

module.exports = router;
