const pizzaOrderController = require("../controllers/pizza");

module.exports = app => {
    app.get("/api/pizzaorders", pizzaOrderController.findAll);
    app.post("/api/pizzaorders", pizzaOrderController.create);
    app.get("/api/pizzaorders/:id", pizzaOrderController.findOne);
    app.put("/api/pizzaorders/:id", pizzaOrderController.update);
    app.delete("/api/pizzaorders/:id", pizzaOrderController.delete);
}