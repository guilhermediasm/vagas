const fs = require("fs");
const path = require("path");
const fakeDataPath = path.join(__dirname, "fakeData.js");

module.exports = function (req, res) {
  const name = req.body.name;
  const job = req.body.job;
  if (name && job) {
    const newUser = {
      name: name,
      job: job,
      count: 0,
    };

    // Carrega o módulo do arquivo fakeData.js
    let users = require("./fakeData");

    const userIndex = users.findIndex((user) => user.name === name);

    // Adiciona o novo usuário ao array existente
    if (userIndex === -1) {
      users.push({ id: users.length + 1, ...newUser });

      // Escreve o conteúdo atualizado de volta no arquivo fakeData.js

      const dataAsString = `module.exports = ${JSON.stringify(
        users,
        null,
        2
      )};\n`;
      fs.writeFileSync(fakeDataPath, dataAsString, "utf8");

      // Retorna o novo usuário como resposta
      delete newUser.count;
      res.send(newUser);
    } else {
      res.send("Esse usuario já está cadastrado");
    }
  } else {
    res.status(409).send("Informe o nome e trabalho");
  }
};
