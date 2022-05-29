const express = require("express");
const { model } = require("mongoose");
const {
  createList,
  addItem,
  getLists,
  deleteItem,
  updateItem,
} = require("../controller/listsController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getLists).post(protect, createList);
router.route("/:id").post(protect, addItem);
router
  .route("/:id/:index")
  .put(protect, updateItem)
  .delete(protect, deleteItem);
module.exports = router;
