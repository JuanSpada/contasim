const Customer = require("../../models/customer");
const { user, showCustomer } = require("./merge");

module.exports = {
  customers: async () => {
    try {
      const customers = await Customer.find();
      return customers.map((customer) => {
        return showCustomer(customer)
      });
    } catch (err) {
      throw err;
    }
  },
  createCustomer: async (args, req) => {
    //Auth
    if (!req.isAuth) {
      throw new Error("No autorizado.");
    }
    const customer = new Customer({
      name: args.customerInput.name,
      email: args.customerInput.email,
      phone: args.customerInput.phone,
      source: args.customerInput.source,
      address: args.customerInput.address,
      creator: req.userId,
    });
    try {
      const result = await customer.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
