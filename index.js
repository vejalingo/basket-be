const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

const BasketData = [
  {
    startDate: new Date().toDateString(),
    totalPremium: 650,
    items: [
      {
        title: "54 Rubenstein Drive",
        subTitle: "HOME CONTENTS COVER",
        price: "225",
        image: "contents",
      },
      {
        title: "Land Rover Defender 2003",
        subTitle: "COMPREHENSIVE CAR COVER",
        price: "650",
        image: "car",
      },
      {
        title: "My Phone",
        subTitle: "SINGLE ITEM COVER",
        price: "250",
        image: "phone",
      },
    ],
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { baskets: [Basket] }
  type Items { title: String, subTitle: String, price: String, image: String }
  type Basket { startDate: String totalPremium: Int items: [Items] }
`;

// The resolvers
const resolvers = {
  Query: { baskets: () => BasketData },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors());

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
