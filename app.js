require('dotenv').config()
var db = require("./models");
db.sequelize.sync({ force: false })

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const GraphQL = require('graphql');
const { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } = GraphQL;

const studentType = require('./types/studentType')(GraphQL);
const StudentService =  require('./services/studentService');
const studentService =  new StudentService(db);

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
      getStudent: {
          type: studentType,
          args: {id: {type: new GraphQLNonNull(GraphQLID)}}
      }
  }
})
const schema =  new GraphQLSchema({
  query: RootQuery
})

var root = {
  getStudent: async ({id}) => await studentService.get(id),
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(process.env.PORT);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');