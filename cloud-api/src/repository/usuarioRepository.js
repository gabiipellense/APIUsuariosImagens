const conexao = require('../database/database');
const Usuario = require('../models/usuario');

// Função para criar um usuário
const criarUsuario = (nome, data_criacao) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuario (nome, data_criacao) VALUES (?, ?)';
    conexao.query(sql, [nome, data_criacao], (err, result) => {
      if (err) return reject(err);
      resolve(new Usuario(result.insertId, nome, data_criacao));
    });
  });
};

// Função para listar todos os usuários
const listarUsuarios = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuario';
    conexao.query(sql, (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(row => new Usuario(row.id, row.nome, row.data_criacao)));
    });
  });
};

// Função para atualizar um usuário
const atualizarUsuario = (id, nome) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuario SET nome = ? WHERE id = ?';
    conexao.query(sql, [nome, id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

// Função para deletar um usuário
const deletarUsuario = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM usuario WHERE id = ?';
    conexao.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
};
