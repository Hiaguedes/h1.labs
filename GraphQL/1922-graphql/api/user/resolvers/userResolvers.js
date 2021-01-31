
const userResolvers = {
    Query: {
        users: (root, args, { dataSources }) => 
                dataSources.usersAPI.getUsers(),
        
        user: (root, {id}, { dataSources }) => 
        dataSources.usersAPI.getUserById(id),
    },
    Mutation: {
        addUser: (root, user, { dataSources }) => 
        dataSources.usersAPI.adicionaUser(user),

        editUser: (root, newData, { dataSources }) => 
        dataSources.usersAPI.editaUser(newData),

        deletUser: (root, {id}, {dataSources }) => 
         dataSources.usersAPI.deletUser(id)
    }
};

module.exports = userResolvers;