const authResolver = require("./auth");
const customerResolver = require("./customer");
const productResolver = require("./product");
const saleResolver = require("./sale");
const accountResolver = require("./account");
const collectionResolver = require("./collection");
const expenseResolver = require("./expense");

const rootResolver = {
  ...authResolver,
  ...customerResolver,
  ...productResolver,
  ...saleResolver,
  ...accountResolver,
  ...collectionResolver,
  ...expenseResolver,
};

module.exports = rootResolver;
