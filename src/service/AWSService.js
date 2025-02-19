// src/service/AWSService.js
const AWSRepository = require('../repository/AWSRepository');

// Função para fazer o upload de um arquivo para o S3
const uploadFileToS3 = async (filePath, bucketName, usuario_id) => {
  try {
    const fileData = await AWSRepository.uploadFile(filePath, bucketName, usuario_id);
    return { fileUrl: fileData.fileUrl, usuario_id };  // Retorna a URL e o ID do usuário
  } catch (err) {
    throw new Error('Erro ao fazer o upload: ' + err.message);
  }
};

// Função para fazer o download de um arquivo do S3
const downloadFileFromS3 = async (bucketName, keyName, downloadPath, usuario_id) => {
  try {
    const downloadedFile = await AWSRepository.downloadFile(bucketName, downloadPath, usuario_id);
    return { downloadedFilePath: downloadedFile.downloadedFilePath, usuario_id };  // Retorna o caminho e o ID do usuário
  } catch (err) {
    throw new Error('Erro ao fazer o download: ' + err.message);
  }
};

const obterImagemURL = async (bucketName, keyName) => {
    const params = {
      Bucket: bucketName,
      Expires: 60 * 5 // O link expira em 5 minutos, você pode ajustar esse tempo
    };
  
    try {
      const url = AWSRepository.downloadFile(); // Gerando um URL assinado
      return url;
    } catch (error) {
      throw new Error('Erro ao obter a imagem: ' + error.message);
    }
  };

module.exports = {
  uploadFileToS3,
  downloadFileFromS3,
  obterImagemURL
};
