const express = require('express');
const { getNewProducts, getFeaturedProducts, getProductForListing, getProduct } = require('../handlers/product-handler');
const { getCategories, getCategoryById } = require('../handlers/category-handler');
const { getBrands } = require("../handlers/brand-handler");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../handlers/wishlist-handler");
const { addToCart, removeFromCart, getCart, clearCart } = require("../handlers/cart-handler");
const { addOrder, getCustomerOrders, cancelOrder } = require("../handlers/order-handler");
const router = express.Router();

router.get("/new-products", async (req, res) => {
    const products = await getNewProducts();
    res.send(products);
});

router.get("/featured-products", async (req, res) => {
    const products = await getFeaturedProducts();
    res.send(products);
});

router.get("/categories", async (req, res) => {
    let result = await getCategories();
    res.send(result);
});

router.get("/brands", async (req, res) => {
    let result = await getBrands();
    res.send(result);
});

router.get("/products", async (req, res) => {
    const { searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId } = req.query;
    let result = await getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId);
    res.send(result);
});

router.get("/product/:id", async (req, res) => {
    const id = req.params["id"];
    const product = await getProduct(id);
    res.send(product);
});

router.get("/category/:id", async (req, res) => {
    const id = req.params["id"];
    const product = await getCategoryById(id);
    res.send(product);
});

// wishlists
router.get("/wishlists", async (req, res) => {
    const userId = req.user.id;
    const items = await getWishlist(userId);
    res.send(items);
});

router.get("/wishlists/:id", async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const item = await addToWishlist(userId, productId);
    res.send(item);
});

router.post("/wishlists/:id", async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const item = await addToWishlist(userId, productId);
    res.send(item);
});

router.delete("/wishlists/:id", async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    await removeFromWishlist(userId, productId);
    res.send({ message: "ok" });
});

// cart
router.get("/carts", async (req, res) => {
    const userId = req.user.id;
    const items = await getCart(userId);
    res.send(items);
});

router.post("/carts/:id", async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const item = await addToCart(userId, productId, quantity);
    res.send(item);
});

router.delete("/carts/:id", async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    await removeFromCart(userId, productId);
    res.send({ message: "ok" });
});

// order
router.post("/order", async (req, res) => {
    const userId = req.user.id;
    const order = req.body;
    await addOrder(userId, order);
    await clearCart(userId);
    return res.send({
        message: "Order Created",
    });
});

router.get("/orders", async (req, res) => {
    const userId = req.user.id;
    const orders = await getCustomerOrders(userId);
    return res.send(orders);
});

router.delete("/orders/:id", async (req, res) => {
    const id = req.body.id;
    await cancelOrder(id);
    res.send({ message: "order canceled" });
});

module.exports = router;