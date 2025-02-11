const imagemService = require('../service/imagemService');
const usuarioService = require('../service/usuarioService');
  
const awsListarImagens = async (req, res) => {
    try {
      const imagens = await imagemService.listarImagens();
      res.status(200).json(imagens);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  };

  const awsListarUsuarios = async (req, res) => {
    try {
      const usuarios = await usuarioService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  };
  

  module.exports = {
    awsListarImagens ,
    awsListarUsuarios,
  }; 