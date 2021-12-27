const Account = require("../../models/account");
const { user, sumAccountBalance, allCllections } = require("./merge");

module.exports = {
  accounts: async () => {
    try {
      const accounts = await Account.find();
      return accounts.map((account) => {
        return {
          ...account._doc,
          _id: account.id,
          creator: user.bind(this, account._doc.creator),
          balance: sumAccountBalance.bind(this, account.id),
          collections: allCllections.bind(this, account.collections),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createAccount: async (args, req) => {
    //Auth
    if (!req.isAuth) {
      throw new Error("No autorizado.");
    }
    const account = new Account({
      name: args.accountInput.name,
      type: 1,
      creator: req.userId,
    });
    try {
      const result = await account.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
