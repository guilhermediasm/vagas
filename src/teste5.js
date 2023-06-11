let data = require("./fakeData");

function getUserReadCount(username) {
  const user = data.find((user) => user.name === username);
  if (user) {
    return user.readCount || 0;
  }
  return -1;
}

module.exports = function (req, res) {
  const username = req.query.username;

  const readCount = getUserReadCount(username);
  if (readCount === -1) {
    res.status(404).send(`Usuario ${username} não encontrado`);

    return;
  } else {
    res.send(`Usuário ${username} foi lido ${readCount} vezes.`);
    return;
  }
};
