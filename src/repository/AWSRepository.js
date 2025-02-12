const AWS = require('aws-sdk');
const fs = require('fs');

// Configuração das credenciais AWS
AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: '',
  secretAccessKey: ''
});

// Criação da instância do S3
const s3 = new AWS.S3();

// Função para fazer o upload de um arquivo para o S3
const uploadFile = (filePath, bucketName, keyName, usuario_id) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: keyName,
    Body: fileContent
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      // Aqui você pode associar o usuário à imagem no banco de dados (se necessário)
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
