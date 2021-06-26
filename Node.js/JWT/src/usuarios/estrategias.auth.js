const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('./usuarios-modelo')
const { InvalidArgumentError } = require('../erros')
const bcrypt = require('bcrypt');


const verificaUsuario = usuario => {
    if(!usuario){
        throw new InvalidArgumentError('Não existe usuário com esse email')
    }
}

const verificaSenha = async (senha, senhaHash) => {
    const senhaValida = await bcrypt.compare(senha, senhaHash)

    if(!senhaValida) {
        throw new InvalidArgumentError('Email ou Senha Inválida')
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false,
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senhaHash);

            done(null, usuario);

        } catch (e) {
            done(e);
        }
    })
)