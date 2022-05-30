const express = require("express");
const { model } = require("mongoose");
const {
  createList,
  addItem,
  getLists,
  deleteItem,
  updateItem,
  deleteList,
  updateList,
} = require("../controller/listsController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// GET all the lists and their contents and
// CREATE new lists
router.route("/").get(protect, getLists).post(protect, createList);

// ADD item to the list
// DELETE a list
// UPDATE the name of a list
router
  .route("/:id")
  .post(protect, addItem)
  .delete(protect, deleteList)
  .put(protect, updateList);

// UPDATE the content of an item
// DELETE the item
router
  .route("/:id/:itemId")
  .put(protect, updateItem)
  .delete(protect, deleteItem);
module.exports = router;
