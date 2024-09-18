// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Ra$hul@786$";

//stateful authenication
// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);

// }

// async function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

//stateless authentication
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

async function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
