const express = require("express");
const router = express.Router();
const Brand = require("../db/brand");
const { getBrands, getBrand, addBrand, updateBrand, deleteBrand } = require("../handlers/brand-handler");

// add 
router.post("", async (req, res) => {
    let model = req.body;
    let result = await addBrand(model);
    res.send(result);
});

// update
router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    await updateBrand(id, model);
    res.send({ message: "ok" });
});

// delete 
router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    await deleteBrand(id);
    res.send({ message: "deleted" });
});

router.get("/:id", async (req, res) => {
    let id = req.params["id"];
    let result = await getBrand(id);
    res.send(result);
});

router.get("", async (req, res) => {
    let result = await getBrands();
    res.send(result);
});

module.exports = router;