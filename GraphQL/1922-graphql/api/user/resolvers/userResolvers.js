const {GraphQLScalarType} = require('graphql');
const userResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value) 
    }),
    RolesType: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO",
    },
    Query: {
        users: (root, args, { dataSources }) => 
                dataSources.usersAPI.getUsers(),
        
        user: (root, {id}, { dataSources }) => 
        dataSources.usersAPI.getUserById(id),
    },
    Mutation: {
        addUser: (root, {user}, { dataSources }) => 
        dataSources.usersAPI.adicionaUser(user),

        editUser: (root, newData, { dataSources }) => 
        dataSources.usersAPI.editaUser(newData),

        deletUser: (root, {id}, {dataSources }) => 
         dataSources.usersAPI.deletUser(id)
    },
    respostaCustom: {
        __resolveType(obj, context, info) {
            return false
          },
       
    }

};

module.exports = userResolvers;