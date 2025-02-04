const conexao = require('../database/database');
const Imagem = require('../models/imagem');

// Função para criar uma imagem
const criarImagem = (titulo, referencia, data_criacao) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO imagem (titulo, referencia, data_criacao) VALUES (?, ?, ?)';
    conexao.query(sql, [titulo, referencia, data_criacao], (err, result) => {
      if (err) return reject(err);
      resolve(new Imagem(result.insertId, titulo, referencia, data_criacao));
    });
  });
};

// Função para listar todas as imagens
const listarImagens = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM imagem';
    conexao.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(row => new Imagem(row.id, row.titulo, row.referencia, row.data_criacao)));
    });
  });
};

// Função para atualizar uma imagem
const atualizarImagem = (id, titulo, referencia) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE imagem SET titulo = ?, referencia = ? WHERE id = ?';
    conexao.query(sql, [titulo, referencia, id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

// Função para deletar uma imagem
const deletarImagem = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM imagem WHERE id = ?';
    conexao.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = {
  criarImagem,
  listarImagens,
  atualizarImagem,
  deletarImagem,
};
