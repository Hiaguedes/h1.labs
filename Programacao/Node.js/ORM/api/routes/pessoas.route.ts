const { Router } = require('express');

const PessoaController = require('../controllers/Pessoa.controller');

const router = Router();

router.get('/pessoas', PessoaController.findAll)
router.get('/pessoas/:id', PessoaController.findPersonById)
router.post('/pessoas', PessoaController.createPerson);
router.delete('/pessoas/:id', PessoaController.deletePersonById);
router.patch('/pessoas/:id', PessoaController.editPersonById);

module.exports = router
