const data = require("./fakeData");

module.exports = function(req, res) {
  const name = req.query.name;

  const userIndex = data.findIndex(user => user.name === name);

  if (userIndex !== -1) {
    data.splice(userIndex, 1);
    res.send("success");
  } else {
    res.status(404).send("User not found");
  }
};
