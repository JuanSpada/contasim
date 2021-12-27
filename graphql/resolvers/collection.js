const Collection = require("../../models/collection");
const Sale = require("../../models/sale");
const Account = require("../../models/account");

const { showCollection, getBalance } = require("./merge");

module.exports = {
  collections: async () => {
    try {
      const collections = await Collection.find();
      return collections.map((collection) => {
        return showCollection(collection);
      });
    } catch (err) {
      throw err;
    }
  },
  createCollection: async (args, req) => {
    //Auth
    if (!req.isAuth) {
      throw new Error("No autorizado.");
    }
    const collection = new Collection({
      amount: args.collectionInput.amount,
      creator: req.userId,
      //ponemos el sale id a mano
      sale: "61c9258b5ebac42ab3c7dea6",
      account: args.collectionInput.account,
    });
    try {
      //ponemos el sale id a mano
      const sale = await Sale.findOne({ _id: "61c9258b5ebac42ab3c7dea6" });
      let balance = await getBalance(sale.price, sale.id);
      //un par de validaciones
      if (balance === 0) {
        throw new Error(`Esta venta ya fue cobrada`);
      }
      if (balance < collection.amount) {
        throw new Error(`No podes cobrar mas caro que el precio de la venta`);
      }
      if (collection.amount === 0) {
        throw new Error(`Tenes que cobrar al menos $1`);
      }
      if (balance <= 0) {
        throw new Error(`Ya cobraste esta venta`);
      }
      balance -= collection.amount;
      console.log("Balance: ", balance);
      console.log("Collection Amount: ", collection.amount);
      console.log("Sale Price: ", sale.price);
      //4) Si queda por cobrar sumamos la cobranza
      sale.collections.push(collection);
      await sale.save();

      //5) Sumamos la cobranza a la caja
      const account = await Account.findById(collection.account);
      account.collections.push(collection);
      await account.save();
      const result = await collection.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
