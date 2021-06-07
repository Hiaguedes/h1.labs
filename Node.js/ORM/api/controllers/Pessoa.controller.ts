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

    static async findPersonById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const findPerson = await database.Pessoas.findOne({where: { id: Number(id) }});
            return res.status(200).json(findPerson)
        }

        catch (e) {
            return res.status(500).json(e.message)
        }
    }

    static async createPerson(req: Request, res: Response){
        const newPerson = req.body;

        try {
            const newPersonCreated = await database.Pessoas.create(newPerson);
            return res.status(200).json(newPersonCreated);
        } catch(e) {
            return res.status(500).json(e.message)
        }
    }

    static async deletePersonById(req: Request, res: Response){
        const { id } = req.params;

        try {
            await database.Pessoas.destroy({where: { id: Number(id) }});
            return res.status(200).json({message: 'Registro deletado'});
        } catch(e) {
            return res.status(500).json(e.message)
        }
    }

    static async editPersonById(req: Request, res: Response){
        const { id } = req.params;
        const newPersonRegister = req.body;

        try {
            await database.Pessoas.update(newPersonRegister, {where: { id: Number(id) }} );

            const findPerson = await database.Pessoas.findOne({where: { id: Number(id) }});
            return res.status(200).json(findPerson);
        } catch(e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = PessoaController;