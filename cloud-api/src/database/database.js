//importar modulo mysql 
const mysql = require('mysql2')

//config conexão 
const conexao = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'db_node_usuario'
});

conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso.')
    criarTabelas()
});

function criarTabelas() {
    const tabelaUsuarios = `
      CREATE TABLE IF NOT EXISTS usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  
    const tabelaImagem = `
      CREATE TABLE IF NOT EXISTS imagem (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        referencia VARCHAR(255),
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  
    // Executando as queries de criação de tabelas
    conexao.query(tabelaUsuarios, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela usuarios:', err);
        return;
      }
      console.log('Tabela "usuarios" criada ou já existente.');
    });
  
    conexao.query(tabelaImagem, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela imagem:', err);
        return;
      }
      console.log('Tabela "imagem" criada ou já existente.');
    });
  }


module.exports = conexao ; 
