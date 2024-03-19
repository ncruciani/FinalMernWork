const PizzaOrder = require("../models/PizzaOrder");

module.exports = {
    findAll: (req, res) => {
        PizzaOrder.find()
            .then( allOrders => res.json(allOrders))
            .catch( err => res.status(400).json(err))
    },

    findOne: (req, res) => {
        PizzaOrder.findById(req.params.id)
            .then( oneOrder => res.json(oneOrder))
            .catch( err => res.status(400).json(err))
    },

    create: (req, res) => {
        PizzaOrder.create(req.body)
            .then( newOrder => res.json(newOrder))
            .catch( err => res.status(400).json(err))
    },

    update: (req, res) => {
        PizzaOrder.findByIdAndUpdate(req.params.id, req.body)
            .then( updatedOrder => res.json(updatedOrder))
            .catch( err => res.status(400).json(err))
    },

    delete: (req, res) => {
        PizzaOrder.findByIdAndDelete(req.params.id)
            .then( deletedOrder => res.json(deletedOrder))
            .catch( err => res.status(400).json(err))
    }
}