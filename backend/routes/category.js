const express = require("express");
const router = express.Router();
const Category = require("./../db/category");
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../handlers/category-handler");

// add Category
router.post("", async (req, res) => {
    let model = req.body;
    let result = await addCategory(model);
    res.send(result);
});

router.get("", async (req, res) => {
    let result = await getCategories();
    res.send(result);
});

// update Category
router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    await updateCategory(id, model);
    res.send({ message: "ok" });
});

router.get("/:id", async (req, res) => {
    let id = req.params["id"];
    let result = await getCategoryById(id);
    res.send(result);
});

// delete Category
router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    await deleteCategory(id);
    res.send({ message: "deleted" });
});

module.exports = router;