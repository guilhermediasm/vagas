const fs = require('fs');
const path = require('path');
const fakeDataPath = path.join(__dirname, 'fakeData.js');

module.exports = function (req, res) {
  const name = req.body.name;
  const job = req.body.job;

  const newUser = {
    name: name,
    job: job,
  };

  // Carrega o módulo do arquivo fakeData.js
  let users = require('./fakeData');

  // Adiciona o novo usuário ao array existente
  users.push(newUser);

  // Escreve o conteúdo atualizado de volta no arquivo fakeData.js
  const dataAsString = `module.exports = ${JSON.stringify(users, null, 2)};\n`;
  fs.writeFileSync(fakeDataPath, dataAsString, 'utf8');

  // Retorna o novo usuário como resposta
  res.send(newUser);
};
