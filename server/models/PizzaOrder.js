const mongoose = require("mongoose");

const PizzaOrderSchema = new mongoose.Schema({
    pizza: {
        type: String,
        required: [true, "Must select a pizza"]
    },
    size: {
        type: String,
        required: [true, "Must select a size"]
    },
    deliveryTime: {
        type: Date,
        required: [true, "Date is required"]
    },
    isDelivered: {
        type: Boolean
    },
    notes: {
        type: String,
        maxLength: [25, "Notes cannot be over 25 characters"]
    }
}, {timestamps: true})

module.exports = mongoose.model("PizzaOrder", PizzaOrderSchema);