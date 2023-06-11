const User = require("../models/user");

function getUserByToken(authorization) {
  const user = User.find((r) => `Bearer ${r.token}` === authorization);
  return user;
}

function checkPermissions(permission) {
  return async function (req, res, next) {
    if (req?.headers?.authorization) {
      try {
        const authorization = req?.headers?.authorization;
        const user = getUserByToken(authorization);
        console.log(user);
        if (!user) {
          res.status(401).send("Unauthorized");
          return;
        }

        if (!user.permissions[permission]) {
          res.status(403).send("Forbidden");
          return;
        }

        next();
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
      }
    } else {
      res.status(401).send("Unauthorized");
      return;
    }
  };
}
module.exports = checkPermissions;
