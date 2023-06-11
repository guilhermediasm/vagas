const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'fakeData.json');

module.exports = function (req, res) {
  const id = req.query.id;
  const { name, job } = req.body;

  // Lê o conteúdo atual do arquivo fakeData.json
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Faz o parse do conteúdo do arquivo para um objeto JSON
    const users = JSON.parse(data);

    // Encontra o índice do usuário no array
    const userIndex = users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
      res.status(404).send('User not found');
      return;
    }

    // Atualiza os dados do usuário
    updateUserData(users[userIndex], name, job);

    // Escreve o conteúdo atualizado no arquivo fakeData.json
    fs.writeFile(dataPath, JSON.stringify(users), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Retorna os dados atualizados do usuário como resposta
      res.send(users[userIndex]);
    });
  });
};

function updateUserData(user, name, job) {
  if (name) {
    user.name = name;
  }
  if (job) {
    user.job = job;
  }
}
