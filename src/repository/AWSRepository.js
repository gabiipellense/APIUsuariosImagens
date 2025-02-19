const AWS = require('aws-sdk');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Configuração das credenciais AWS usando variáveis de ambiente
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: '',
  secretAccessKey: ''
});

// Instância do S3
const s3 = new AWS.S3();

// Função para fazer o upload de um arquivo para o S3
const uploadFile = (filePath, bucketName, usuario_id) => {
  const fileContent = fs.readFileSync(filePath); // Lê o arquivo corretamente
  const key = uuidv4(); // Gera um UUID para nome do arquivo

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent // Agora Body está correto!
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve({
        fileUrl: data.Location,
        usuario_id
      });
    });
  });
};

// Função para baixar um arquivo do S3
const downloadFile = (bucketName, keyName, downloadPath, usuario_id) => {
  const params = {
    Bucket: bucketName,
    Key: keyName
  };

  const file = fs.createWriteStream(downloadPath);

  return new Promise((resolve, reject) => {
    s3.getObject(params).createReadStream().pipe(file);

    file.on('close', () => {
      resolve({
        downloadedFilePath: downloadPath,
        usuario_id
      });
    });

    file.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = {
  uploadFile,
  downloadFile
};
