const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'http://localhost:3000';
        this.respostaCustom = {
            code: 200,
            mensagem: 'Successo'
        };
    }

    async getUsers() {
        const users = await this.get('/users');
        return users.map(async ({id,nome,email,ativo, role, createdAt}) => {
            return {
                id,
                nome,
                email,
                ativo,
                createdAt,
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
        const {id, user} = newData;
        const role = await this.get(`/roles?type=${user.role}`)
        await this.put(`users/${id}`, {...user, role: role[0].id})

        return ({
            ...this.respostaCustom,
            user: {
            ...user, 
            role: role[0]
            }
        })
    }

    async deletUser(id){
        await this.delete(`users/${id}`)
        return this.respostaCustom; // nao precisa passar nada como retorno no graphql

        /* 
        mutation {
            deletUser(id: 8)
        }
        */
    }

}

module.exports  = UsersAPI;
