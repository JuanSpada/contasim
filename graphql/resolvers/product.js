const Product = require("../../models/product");
const { user } = require("./merge");

module.exports = {
  products: async () => {
    try {
      const products = await Product.find();
      return products.map((product) => {
        return {
          ...product._doc,
          _id: product.id,
          creator: user.bind(this, product._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createProduct: async (args, req) => {
    //Auth
    if (!req.isAuth) {
      throw new Error("No autorizado.");
    }
    const product = new Product({
      name: args.productInput.name,
      description: args.productInput.description,
      price: args.productInput.price,
      creator: req.userId,
    });
    try {
      const result = await product.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
