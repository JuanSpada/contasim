// const Account = require("../../models/account");
const Expense = require("../../models/expense");
const { user, showAccount } = require("./merge");

module.exports = {
  expenses: async () => {
    try {
      const expenses = await Expense.find();
      console.log(expenses);
      return expenses.map((expense) => {
        return {
          ...expense._doc,
          _id: expense.id,
          creator: user.bind(this, expense._doc.creator),
          account: showAccount.bind(this, expense._doc.account),
          //   balance: sumAccountBalance.bind(this, expense.id),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createExpense: async (args, req) => {
    //Auth
    if (!req.isAuth) {
      throw new Error("No autorizado.");
    }
    const expense = new Expense({
      description: args.expenseInput.description,
      type: 1,
      price: args.expenseInput.price,
      creator: req.userId,
      account: args.expenseInput.account,
    });
    try {
      const result = await expense.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
};
