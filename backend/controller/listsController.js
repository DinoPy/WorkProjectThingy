const List = require("../model/listsModel");
const User = require("../model/userModel");
const Item = require("../model/itemsModel");
const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const { find } = require("../model/listsModel");

/**
 *  Get lists
 */

const getLists = asyncHandler(async (req, res) => {
  const listsFound = await List.find();
  res.status(200).json(listsFound);
});

/**
 *  Create empty list
 */

const createList = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const list = await List.create({
    name: name,
    user: req.user.id,
  });

  res.status(200).json(list);
});

/**
 *  Add item to the list found via the param. It goes on Root
 */

const addItem = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error(`Please add an item`);
  }
  const listFound = await List.findById(req.params.id);

  if (!listFound) {
    res.status(400);
    throw new Error("No matching list found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const newItem = await Item.create({
    content: content,
    user: req.user.id,
    parentList: listFound._id,
  });

  await listFound.items.push(newItem);
  await listFound.save();
  res.status(200).json(listFound);
});

/**
 *   Delete an item
 */

const deleteItem = asyncHandler(async (req, res) => {
  let listFound = await List.findById(req.params.id);
  const itemFound = await Item.findById(req.params.itemId);

  if (!itemFound) {
    res.status(400);
    throw new Error("No matching item found");
  }
  if (!listFound) {
    res.status(400);
    throw new Error("No matching list found");
  }

  listFound.items = listFound.items.filter(
    (item) => item._id.toString() !== req.params.itemId
  );

  await listFound.save();
  await itemFound.remove();

  res.status(200).json(itemFound);
});

/**
 *  Update an item
 */

const updateItem = asyncHandler(async (req, res) => {
  const itemFound = await Item.findById(req.params.itemId);
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("No new value was provided");
  }

  if (!itemFound) {
    res.status(400);
    throw new Error("No matching list found");
  }

  itemFound.content = content;
  await itemFound.save();

  res.status(200).json(itemFound);
});

/**
 *  Delete list
 */

const deleteList = asyncHandler(async (req, res) => {
  const listFound = await List.findById(req.params.id);
  const itemsFound = await Item.find({ parentList: req.params.id });
  if (!listFound) {
    res.status(400);
    throw new Error("No matching list found");
  }

  await Item.deleteMany({ parentList: req.params.id });
  await listFound.remove();
  res.status(200).json(listFound);
});

/**
 *    Update List  -- Change name
 */

const updateList = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add a new name");
  }

  const foundList = await List.findById(req.params.id);

  foundList.name = name;
  await foundList.save();

  res.status(200).json(foundList);
});

const listControler = {
  createList,
  addItem,
  getLists,
  deleteItem,
  updateItem,
  deleteList,
  updateList,
};

module.exports = listControler;
