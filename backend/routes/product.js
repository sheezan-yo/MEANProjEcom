const express = require("express");
const router = express.Router();
const Product = require("../db/product");
const { addProduct, updateProduct, deleteProduct, getProducts, getProduct } = require("../handlers/product-handler");

// add 
router.post("", async (req, res) => {
    let model = req.body;
    let result = await addProduct(model);
    res.send(result);
});

// update
router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    await updateProduct(id, model);
    res.send({ message: "ok" });
});

// delete 
router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    await deleteProduct(id);
    res.send({ message: "deleted" });
});

router.get("/:id", async (req, res) => {
    let id = req.params["id"];
    let result = await getProduct(id);
    res.send(result);
});

router.get("", async (req, res) => {
    let result = await getProducts();
    res.send(result);
});

module.exports = router;