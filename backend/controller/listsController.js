const List = require("../model/listsModel");
const User = require("../model/userModel");
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
    items: [],
  });

  res.status(200).json(list);
});

/**
 *  Add item to the list found via the param. It goes on Root
 */
const addItem = asyncHandler(async (req, res) => {
  const { item } = req.body;

  if (!item) {
    res.status(400);
    throw new Error(`Please add an item}`);
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

  await listFound.items.push(item);
  await listFound.save();
  console.log(listFound);

  res.status(200).json(listFound);
});

const deleteItem = asyncHandler(async (req, res) => {
  const listFound = await List.findById(req.params.id);

  if (!listFound) {
    res.status(400);
    throw new Error("No matching list found");
  }

  listFound.items.splice(req.params.index, 1);
  await listFound.save();

  res.status(200).json({ list: req.params.id, item: req.params.index });
});

const updateItem = asyncHandler(async (req, res) => {
  const listFound = await List.findById(req.params.id);
  const { item } = req.body;

  if (!item) {
    res.status(400);
    throw new Error("No new value was provided");
  }

  if (!listFound) {
    res.status(400);
    throw new Error("No matching list found");
  }

  listFound.items[req.params.index] = item;
  await listFound.save();

  res.status(200).json(listFound);
});

const listControler = {
  createList,
  addItem,
  getLists,
  deleteItem,
  updateItem,
};

module.exports = listControler;
