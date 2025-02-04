const imagemRepository = require('../repository/imagemRepository');

// Função para criar imagem
const criarImagem = async (titulo, referencia) => {
  const data_criacao = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    return await imagemRepository.criarImagem(titulo, referencia, data_criacao);
  } catch (err) {
    throw new Error('Erro ao criar a imagem');
  }
};

// Função para listar imagens
const listarImagens = async () => {
  try {
    return await imagemRepository.listarImagens();
  } catch (err) {
    throw new Error('Erro ao listar imagens');
  }
};

// Função para atualizar imagem
const atualizarImagem = async (id, titulo, referencia) => {
  try {
    return await imagemRepository.atualizarImagem(id, titulo, referencia);
  } catch (err) {
    throw new Error('Erro ao atualizar a imagem');
  }
};

// Função para deletar imagem
const deletarImagem = async (id) => {
  try {
    return await imagemRepository.deletarImagem(id);
  } catch (err) {
    throw new Error('Erro ao deletar a imagem');
  }
};

module.exports = {
  criarImagem,
  listarImagens,
  atualizarImagem,
  deletarImagem,
};
