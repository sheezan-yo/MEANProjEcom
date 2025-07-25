require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);

// app.use("/category", categoryRoutes);
// app.use("/brand", brandRoutes);
// app.use("/product", productRoutes);
// app.use("/customer", verifyToken, customerRoutes);
// app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("server running");
});

// async function connnectDb() {
//     await mongoose.connect("mongodb://127.0.0.1:27017", {
//         dbName: "ecom-proj3-db",
//     });
//     console.log("Mongodb connected");
// }

async function connnectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}

connnectDb().catch((err) => {
    console.error(err);
});

app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

app.listen(port, () => {
    console.log("server running on port", port);
});