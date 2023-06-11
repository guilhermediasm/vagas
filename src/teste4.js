const fs = require('fs');
const path = require('path');
const fakeDataPath = path.join(__dirname, 'fakeData.js');

module.exports = function (req, res) {
  const id = req.query.id;
  const { name, job } = req.body;

  let data = require('./fakeData');

  const user = data.find((user) => user.id === id);

  if (!user) {
    res.status(404).send('Usuario não encontrado');
    return;
  }

  updateUserData(user, name, job);

  const dataAsString = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(fakeDataPath, dataAsString, 'utf8');

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
