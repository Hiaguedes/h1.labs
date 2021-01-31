const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'http://localhost:3000'
    }

    async getUsers() {
        const users = await this.get('/users');
        return users.map(async ({id,nome,email,ativo, role}) => {
            return {
                id,
                nome,
                email,
                ativo,
                role: await this.get(`/roles/${role}`)
            }
        })
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`)
        user.role = await this.get(`/roles/${user.role}`)
        return user
    }

    async adicionaUser(user) {
        const users = await this.get('/users');
        const role = await this.get(`/roles?type=${user.role}`)
        user.id = users.length + 1;
        await this.post('users', {...user, role: role[0].id})

        return ({
            ...user, 
            role: role[0]
        })
    }

    async editaUser(newData) {
        const role = await this.get(`/roles?type=${newData.role}`)
        await this.put(`users/${newData.id}`, {...newData, role: role[0].id})

        return ({
            ...newData, 
            role: role[0]
        })
    }

    async deletUser(id){
        await this.delete(`users/${id}`)
        return id; // nao precisa passar nada no graphql

        /* 
        mutation {
            deletUser(id: 8)
        }
        */
    }

}

module.exports  = UsersAPI;
