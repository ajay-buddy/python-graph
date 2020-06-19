'use strict';

const express = require('express');
const expressGraphQL = require('express-graphql')

const schema = require('./schema/schema')
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);