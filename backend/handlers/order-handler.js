const Order = require("./../db/order");
const { clearCart } = require("./cart-handler");

async function addOrder(userId, orderModel) {
    let order = new Order({
        ...orderModel,
        userId: userId,
        status: "inprogress",
    });
    await order.save();
}

async function getCustomerOrders(userId) {
    let orders = await Order.find({
        userId: userId
    });
    return orders.map((x) => x.toObject());
}

async function cancelOrder(id) {
    await Order.deleteOne(id);
    return;
}

async function getOrders() {
    let orders = await Order.find();
    return orders.map((x) => x.toObject());
}

async function updateOrderStatus(id, status) {
    await Order.findByIdAndUpdate(id, {
        status: status,
    });
}

module.exports = { addOrder, getCustomerOrders, cancelOrder, getOrders, updateOrderStatus }