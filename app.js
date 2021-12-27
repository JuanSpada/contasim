const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/api",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    //usamos graphical para poder probar el api en el navegador pegandole al url del api
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb://localhost:27017/wemanagement_app?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`
  )
  .then(() => {
    console.log("Connected to mongoose");
    app.listen(3000);
  })
  .catch((err) => {
    throw err;
  });
