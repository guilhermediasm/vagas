const fs = require('fs');
const path = require('path');
const fakeDataPath = path.join(__dirname, 'fakeData.js');

module.exports = function (req, res) {
  const id = req.query.id;
  const { name, job } = req.body;

  // Carrega o módulo do arquivo fakeData.js
  let data = require('./fakeData');

  // Encontra o usuário pelo ID
  const user = data.find((user) => user.id === id);

  if (!user) {
    res.status(404).send('Usuario não encontrado');
    return;
  }

  // Atualiza os dados do usuário
  updateUserData(user, name, job);

  // Escreve o conteúdo atualizado de volta no arquivo fakeData.js
  const dataAsString = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(fakeDataPath, dataAsString, 'utf8');

  // Retorna os dados atualizados do usuário como resposta
  res.send(user);
};

function updateUserData(user, name, job) {
  if (name) {
    user.name = name;
  }
  if (job) {
    user.job = job;
  }
}
