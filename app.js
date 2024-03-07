require('dotenv').config()
var db = require("./models");
db.sequelize.sync({ force: false })

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const GraphQL = require('graphql');
const { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString} = GraphQL;

const studentType = require('./types/studentType')(GraphQL);
const schoolType = require('./types/schoolType')(GraphQL);
const teacherType = require('./types/teacherType')(GraphQL);
const StudentService = require('./services/studentService');
const studentService =  new StudentService(db);
const SchoolService =  require('./services/schoolService');
const schoolService =  new SchoolService(db);
const TeacherService =  require('./services/teacherService');
const teacherService =  new TeacherService(db);

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
      getStudent: {
          type: studentType,
          args: {id: {type: new GraphQLNonNull(GraphQLID)}}
      },
      getStudents: {
        type: GraphQLList(studentType)
      },
      getTeacher: {
          type: teacherType,
          args: {id: {type: new GraphQLNonNull(GraphQLID)}}
      },
      getTeachers: {
        type: GraphQLList(teacherType)
      },
      getSchool: {
        type: schoolType,
        args: {id: {type: new GraphQLNonNull(GraphQLID)}}
      },
      getSchools: {
        type: GraphQLList(schoolType)
      }
  }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createStudent: {
        type: studentType,
        args: {
          FirstName: { type: GraphQLString },
          LastName: { type: GraphQLString },
          SchoolId: { type: GraphQLID }
        }
      },
      createSchool: {
        type: studentType,
        args: {
          Name: { type: GraphQLString },
          Address: { type: GraphQLString },
          Description: { type: GraphQLString }
        }
      },
      createTeacher: {
        type: teacherType,
        args: {
          FirstName: { type: GraphQLString },
          LastName: { type: GraphQLString },
          SchoolId: { type: GraphQLID }
        }
      },
      deleteStudent: {
        type: studentType,
        args: {
          id: { type: GraphQLID }
        }
      },
      deleteSchool: {
        type: schoolType,
        args: {
          id: { type: GraphQLID }
        }
      },
      deleteTeacher: {
        type: teacherType,
        args: {
          id: { type: GraphQLID }
        }
      }
    }
  });  

const schema =  new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

var root = {
  getStudent: async ({id}) => await studentService.get(id),
  getStudents: async () => await studentService.getAll(),
  createStudent: async({FirstName, LastName, SchoolId}) => await studentService.create(FirstName, LastName, SchoolId),
  deleteStudent: async({id}) => await studentService.delete(id),
  getSchool: async ({id}) => await schoolService.get(id),
  getSchools: async () => await schoolService.getAll(),
  createSchool: async({Name, Address, Description}) => await schoolService.create(Name, Address, Description),
  deleteSchool: async({id}) => await schoolService.delete(id),
  getTeacher: async ({id}) => await teacherService.get(id),
  getTeachers: async () => await teacherService.getAll(),
  createTeacher: async({FirstName, LastName, SchoolId}) => await teacherService.create(FirstName, LastName, SchoolId),
  deleteTeacher: async({id}) => await teacherService.delete(id),
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(process.env.PORT);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');