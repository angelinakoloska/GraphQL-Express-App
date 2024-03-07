module.exports = (graphql) => {
    return new graphql.GraphQLObjectType({
      name: 'Teacher',
      fields: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
        SchoolId: {
          type: graphql.GraphQLID,
        },
        FirstName: {
          type: graphql.GraphQLString,
        },
        LastName: {
          type: graphql.GraphQLString,
        }
      }
    });
}