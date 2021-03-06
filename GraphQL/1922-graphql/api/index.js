const { ApolloServer } = require('apollo-server');
const userSquema = require('./user/schema/user.graphql');
const userResolvers = require('./user/resolvers/userResolvers');
const UsersAPI = require('./user/datasource/user-datasource');

const typeDefs = [userSquema];
const resolvers = [userResolvers];

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
        usersAPI: new UsersAPI()
        }
    }
});

server.listen().then(({url}) => console.log(`Servidor escutando na porta ${url}`))

// o schema define o que pode ser feito no graphql e os resolvers são as funções que podemos escrever para implementar o que foi definido no squema