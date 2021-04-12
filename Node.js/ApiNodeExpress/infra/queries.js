const conexao = require('./conexao');

const executaQuery = (query, params = '') => {
    return  new Promise((res, rej) => {
        conexao.query(query, params, async (errs, results, fields) => {
            if(errs) {
                rej(errs)
            } else {
                res(results)
            }
        })
    })
};

module.exports = executaQuery