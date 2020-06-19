const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: companyType,
            resolve(parentValue, args) {
                console.log('company', parentValue)
                return _.find(company, { id: parentValue.company });
            }
        }
    })
});

const companyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        user: {
            type: userType,
            resolve(parentValue, args) {
                return _.find(users, { company: parentValue.id });
            }
        }
    })
});

const users = [
    { 'id': '1', 'name': 'Ajay', age: '29', 'company': '1'},
    { 'id': '2', 'name': 'Aarti', age: '28', 'company': '1'},
    { 'id': '3', 'name': 'Ajay1', age: '29', 'company': '2'},
    { 'id': '4', 'name': 'Aarti1', age: '28', 'company': '2'}
]

const company = [
    { 'id': '1', 'name': 'Google' },
    { 'id': '2', 'name': 'Facebook' }
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                console.log(parentValue);
                console.log(args);
                return _.find(users, { id: args.id });
            }
        },
        company: {
            type: companyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(company, { id: args.id })
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                company: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                console.log(parentValue, args)
                users.push({
                    id: args.id,
                    name: args.name,
                    age: args.age,
                    company: args.company
                });
                return _.find(users, { id: args.id });
            }
        },
        addCompany: {
            type: companyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                    company.push({
                        id: args.id,
                        name: args.name
                    });
                    return _.find(company, { id: args.id }) 
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})