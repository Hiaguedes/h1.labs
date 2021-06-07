const { Router } = require('express');
import { Request, Response } from 'express';

const PessoaController = require('../controllers/Pessoa.controller');

const router = Router();

router.get('/pessoas', PessoaController.findAll)

module.exports = router
