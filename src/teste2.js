const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'fakeData.json');

module.exports = function (req, res) {
  const name = req.body.name;
  const job = req.body.job;

  const newUser = {
    name: name,
    job: job,
  };

  // Lê o conteúdo atual do arquivo fakeData.json
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Faz o parse do conteúdo do arquivo para um objeto JSON
    const users = JSON.parse(data);

    // Adiciona o novo usuário ao array existente
    users.push(newUser);

    // Escreve o conteúdo atualizado no arquivo fakeData.json
    fs.writeFile(dataPath, JSON.stringify(users), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Retorna o novo usuário como resposta
      res.send(newUser);
    });
  });
};
