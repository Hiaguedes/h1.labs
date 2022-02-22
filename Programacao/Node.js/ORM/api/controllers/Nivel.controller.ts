const database = require('../models')
import { Request, Response } from 'express';

class NivelController {
  static async pegaTodosOsNiveis(req: Request, res: Response){
    try {
      const todosOsNiveis = await database.Niveis.findAll()
      return res.status(200).json(todosOsNiveis)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmNivel(req: Request, res: Response) {
    const { id } = req.params
    try {
      const umNivel = await database.Niveis.findOne( { 
        where: { 
          id: Number(id) 
        }
      })
      return res.status(200).json(umNivel)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaNivel(req: Request, res: Response) {
    const novoNivel = req.body
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel)
      return res.status(200).json(novoNivelCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaNivel(req: Request, res: Response) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Niveis.update(novasInfos, { where: { id: Number(id) }})
      const nivelAtualizado = await database.Niveis.findOne( { where: { id: Number(id) }})
      return res.status(200).json(nivelAtualizado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaNivel(req: Request, res: Response) {
    const { id } = req.params
    try {
      await database.Niveis.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = NivelController