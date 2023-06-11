var data = require("./fakeData");

const getUser = (req, res, next) => {
  var name = req.query.name;

  const user = data.find((item) => item.name === name);

  if (user) {
    user.count = user.count ? user.count + 1 : 1;
    res.send(user);
  } else {
    res.status(404).send("User not found");
  }
};

const getUsers = (req, res, next) => {
  res.send(data);
};

module.exports = {
  getUser,
  getUsers,
};
