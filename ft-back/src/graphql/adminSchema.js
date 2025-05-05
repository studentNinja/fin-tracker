const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const User = require('../models/User');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString }
    }
});

const NewAdminInput = new GraphQLInputObjectType({
    name: 'NewAdminInput',
    fields: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        capital: { type: new GraphQLNonNull(GraphQLFloat) },
        saving_goal: { type: GraphQLFloat }
    }
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        allUsers: {
            type: new GraphQLList(UserType),
            resolve: () => User.find().select('-password')
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: (_, { id }) => User.findById(id).select('-password')
        }
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createAdmin: {
            type: UserType,
            args: { input: { type: new GraphQLNonNull(NewAdminInput) } },
            resolve: async (_, { input }) => {
                if (await User.exists({ email: input.email })) {
                    throw new Error('Email already in use');
                }
                const admin = new User({ ...input, role: 'ADMIN' });
                await admin.save();
                return admin;
            }
        },
        deleteUser: {
            type: GraphQLString,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: async (_, { id }) => {
                if (!await User.exists({ _id: id })) {
                    throw new Error('User not found');
                }
                await User.findByIdAndDelete(id);
                return 'User deleted';
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
