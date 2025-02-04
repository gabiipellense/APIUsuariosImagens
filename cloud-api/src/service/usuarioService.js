const usuarioRepository = require('../repository/usuarioRepository');

// Função para criar usuário
const criarUsuario = async (nome) => {
  const data_criacao = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    return await usuarioRepository.criarUsuario(nome, data_criacao);
  } catch (err) {
    throw new Error('Erro ao criar o usuário');
  }
};

// Função para listar usuários
const listarUsuarios = async () => {
  try {
    return await usuarioRepository.listarUsuarios();
  } catch (err) {
    throw new Error('Erro ao listar usuários');
  }
};

// Função para atualizar usuário
const atualizarUsuario = async (id, nome) => {
  try {
    return await usuarioRepository.atualizarUsuario(id, nome);
  } catch (err) {
    throw new Error('Erro ao atualizar o usuário');
  }
};

// Função para deletar usuário
const deletarUsuario = async (id) => {
  try {
    return await usuarioRepository.deletarUsuario(id);
  } catch (err) {
    throw new Error('Erro ao deletar o usuário');
  }
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
};
