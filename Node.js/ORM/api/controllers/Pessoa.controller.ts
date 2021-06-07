const database = require('../models');
import { Request, Response } from 'express';

class PessoaController {
    static async findAll(req: Request, res: Response){
        try {
            const findAllPeople = await database.Pessoas.findAll();
            return res.status(200).json(findAllPeople)
        }

        catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = PessoaController;