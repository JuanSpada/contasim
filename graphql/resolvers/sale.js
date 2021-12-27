const Sale = require("../../models/sale");
const Customer = require("../../models/customer");
const { showSale } = require("./merge");

module.exports = {
  sales: async () => {
    try {
      const sales = await Sale.find();
      return sales.map((sale) => {
        return showSale(sale)
      });
    } catch (err) {
      throw err;
    }
  },
  createSale: async (args, req) => {
    //Auth
    if (!req.isAuth) {
      throw new Error("No autorizado.");
    }
    const sale = new Sale({
      description: args.saleInput.description,
      discount: args.saleInput.discount,
      price: args.saleInput.price,
      creator: req.userId,
      //pongo el id del customer a mano
      customer: "61c8f737ddedd988ab0618a2"
    });
    //Estoy poniendo todos los productos, hay que cambiarlo.
    try {
      const result = await sale.save();
      const customer = await Customer.findOne({
        //pongo el id del customer a mano
        _id: "61c8f737ddedd988ab0618a2",
      });
      customer.sales.push(sale);
      await customer.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
