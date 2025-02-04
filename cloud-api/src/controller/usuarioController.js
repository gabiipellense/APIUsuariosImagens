const usuarioService = require('../service/usuarioService');

// Criar novo usuário
const criarUsuario = async (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório.' });
  }

  try {
    const usuario = await usuarioService.criarUsuario(nome);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Atualizar usuário
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório.' });
  }

  try {
    const atualizado = await usuarioService.atualizarUsuario(id, nome);
    if (!atualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Deletar usuário
const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const deletado = await usuarioService.deletarUsuario(id);
    if (!deletado) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
};

