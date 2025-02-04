const express = require('express');
const app = express();

// Middleware para lidar com JSON no corpo das requisições
app.use(express.json());

const routes = require('./src/routes/route'); 
app.use('/', routes);

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
