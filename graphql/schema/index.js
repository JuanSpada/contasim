const { buildSchema } = require("graphql");
module.exports = buildSchema(`
type User {
  _id: ID!
  email: String!
  password: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Customer {
  _id: ID!
  name: String!
  email: String!
  phone: String!
  soruce: String
  address: String
  sales: [Sale!]!
  creator: User!
}

type Sale {
  _id: ID!
  description: String
  discount: Int
  price: Float
  balance: Float
  customer: Customer!
  creator: User!
  collections: [Collection!]!
}

type Account {
  _id: ID!
  name: String
  type: Int
  balance: Float!
  creator: User!
  collections: [Collection!]!
}

type Expense {
  _id: ID!
  description: String!
  type: Int!
  price: Float!
  creator: User!
  account: Account!
}

type Collection {
  _id: ID!
  amount: Float
  account: Account!
  sale: Sale!
  creator: User!
}

input UserInput {
  email: String!
  password: String!
}

input CustomerInput {
  name: String!
  email: String!
  phone: String!
  source: String
}

input SaleInput {
  description: String
  discount: Int
  price: Float
}

input AccountInput {
  name: String
  type: Int
}

input CollectionInput {
  amount: Float
  account: ID!
}

input ExpenseInput {
  description: String!
  type: Int!
  price: Float!
  account: ID!
}

type rootQuery {
  login(email: String!, password: String!): AuthData!
  customers: [Customer!]!
  sales: [Sale!]!
  accounts: [Account!]!
  collections: [Collection!]!
  expenses: [Expense!]!
}

type rootMutation {
  createUser(userInput: UserInput): User
  createCustomer(customerInput: CustomerInput): Customer
  createSale(saleInput: SaleInput): Sale
  createAccount(accountInput: AccountInput): Account
  createCollection(collectionInput: CollectionInput): Collection
  createExpense(expenseInput: ExpenseInput): Expense
}

schema {
  query: rootQuery
  mutation: rootMutation
}`);
