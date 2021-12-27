const Customer = require("../../models/customer");
const User = require("../../models/user");
const Sale = require("../../models/sale");
const Collection = require("../../models/collection");
const Account = require("../../models/account");

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
    };
  } catch (err) {
    throw err;
  }
};

const showSale = async (saleId) => {
  try {
    const sale = await Sale.findById(saleId);
    return {
      ...sale._doc,
      _id: sale.id,
      creator: user.bind(this, sale._doc.creator),
      customer: showCustomer.bind(this, sale._doc.customer),
      balance: getBalance.bind(this, sale.price, sale.id),
    };
  } catch (err) {
    throw err;
  }
};

const showCustomer = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId);
    return {
      ...customer._doc,
      _id: customer.id,
      creator: user.bind(this, customer._doc.creator),
    };
  } catch (err) {
    throw err;
  }
};

const showCollection = async (collectionId) => {
  try {
    const collection = await Collection.findById(collectionId);
    return {
      ...collection._doc,
      _id: collection.id,
      creator: user.bind(this, collection._doc.creator),
      sale: showSale.bind(this, collection._doc.sale),
      account: showAccount.bind(this, collection._doc.account)
    };
  } catch (err) {
    throw err;
  }
};

const showAccount = async (accountId) => {
  try {
    const account = await Account.findById(accountId);
    return {
      ...account._doc,
      _id: account.id,
      creator: user.bind(this, account._doc.creator),
      collections: allCllections.bind(this, account._doc.collections),
    };
  } catch (err) {
    throw err;
  }
};

const allCllections = async (collectionIds) => {
  const fetchedCollections = await Collection.find({
    _id: { $in: collectionIds },
  });
  try {
    return fetchedCollections.map((collection) => {
      return showCollection(collection);
    });
  } catch (err) {
    throw err;
  }
};

const getBalance = async (salePrice, saleId) => {
  sale = await Sale.findById(saleId);
  const fetchedCollections = await Collection.find({
    _id: { $in: sale.collections },
  });
  let balance = salePrice;
  fetchedCollections.forEach((collection) => {
    balance -= collection.amount;
    collection.balance -= collection.amount;
    collection.save();
  });
  return balance;
};

const sumAccountBalance = async (accountId) => {
  const account = await Account.findById(accountId);
  let balance = 0;
  const fetchedCollections = await Collection.find({
    _id: { $in: account.collections },
  });
  fetchedCollections.forEach((collection) => {
    balance += collection.amount;
  });
  return balance;
};

exports.user = user;
exports.showSale = showSale;
exports.showCustomer = showCustomer;
exports.showCollection = showCollection;
exports.getBalance = getBalance;
exports.sumAccountBalance = sumAccountBalance;
exports.allCllections = allCllections;
exports.showAccount = showAccount;
