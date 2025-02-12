const express = require('express');
const usuarioController = require('../controller/usuarioController');
const imagemController = require('../controller/imagemController');
const AWSController = require('../controller/AWSController');
const router = express.Router();

// Rotas de usuários
router.post('/usuarios/postar', async (req, res) => {
  usuarioController.criarUsuario(req, res);
});

router.get('/usuarios/ler', async (req, res) => {
  usuarioController.listarUsuarios(req, res);
});

router.put('/usuarios/atualizar/:id', async (req, res) => {
  usuarioController.atualizarUsuario(req, res);
});

router.delete('/usuarios/deletar/:id', async (req, res) => {
  usuarioController.deletarUsuario(req, res);
});

// Rotas de imagens
router.post('/imagens/postar', async (req, res) => {
  imagemController.criarImagem(req, res);
});

router.get('/imagens/ler', async (req, res) => {
  imagemController.listarImagens(req, res);
});

router.put('/imagens/atualizar/:id', async (req, res) => {
  imagemController.atualizarImagem(req, res);
});

router.delete('/imagens/deletar/:id', async (req, res) => {
  imagemController.deletarImagem(req, res);
});

router.get('/imagens/aws/ler', async (req, res) => {
  AWSController.awsListarImagens(req, res);
});

router.get('/usuarios/aws/ler', async (req, res) => {
  AWSController.awsListarUsuarios(req, res);
});

router.post('/aws/upload', AWSController.awsUploadFile);

router.post('/aws/download', AWSController.awsDownloadFile);

router.get('/imagens/aws', AWSController.obterImagem);


module.exports = router;
