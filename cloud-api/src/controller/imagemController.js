const imagemService = require('../service/imagemService');

// Criar nova imagem
const criarImagem = async (req, res) => {
  const { titulo, referencia } = req.body;

  if (!titulo || !referencia) {
    return res.status(400).json({ erro: 'Título e referência são obrigatórios.' });
  }

  try {
    const imagem = await imagemService.criarImagem(titulo, referencia);
    res.status(201).json(imagem);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar todas as imagens
const listarImagens = async (req, res) => {
  try {
    const imagens = await imagemService.listarImagens();
    res.status(200).json(imagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Atualizar imagem
const atualizarImagem = async (req, res) => {
  const { id } = req.params;
  const { titulo, referencia } = req.body;

  if (!titulo || !referencia) {
    return res.status(400).json({ erro: 'Título e referência são obrigatórios.' });
  }

  try {
    const atualizado = await imagemService.atualizarImagem(id, titulo, referencia);
    if (!atualizado) {
      return res.status(404).json({ erro: 'Imagem não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Imagem atualizada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Deletar imagem
const deletarImagem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletado = await imagemService.deletarImagem(id);
    if (!deletado) {
      return res.status(404).json({ erro: 'Imagem não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Imagem deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = {
  criarImagem,
  listarImagens,
  atualizarImagem,
  deletarImagem,
};

