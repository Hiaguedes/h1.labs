const arrayUsers = [
    { 
        nome: 'Ana',
        ativo: true,
    },
    { 
        nome: 'Xoão',
        ativo: false,
    },
];

const userResolvers = {
    Query: {
        users: () => arrayUsers,
        primeiroUser: () => arrayUsers[0],
    }
};

module.exports = userResolvers;