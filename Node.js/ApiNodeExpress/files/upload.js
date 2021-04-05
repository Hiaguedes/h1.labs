const fs = require('fs');
const Path = require('path');

const uploadAnyFile = (path, cb, nameFile = String(new Date().getTime())) => {

    const tiposValidos = ['jpg', 'png', 'jpeg'];
    const tipo = Path.extname(path);
    const isTipoValido = tiposValidos.some(extension => extension === tipo.substring(1))

    if(!isTipoValido) {
        console.log('Tipo Invalido')
        cb(undefined,'Tipo é inválido')
    }else {
        const newPath = `./assets/imgs/${nameFile}-${String(new Date().getTime())}${tipo}`
        console.log(newPath)

        fs.createReadStream(path)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => cb(newPath,undefined))
    }

}

module.exports = uploadAnyFile