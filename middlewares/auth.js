const { getUser } = require("../service/auth");
async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  // const userUid = req.headers["authorization"];
  // const token = userUid.split('Bearer ')[1];
  

  if(!userUid) return res.redirect("/login");

  const user = await getUser(userUid);
  // const user = await getUser(token);
  // console.log("Fetched User in Middleware:", user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  // console.log("Cookie UID:", userUid);
  // console.log(req.headers);
  

  // const userUid = req.headers["authorization"]
  // const token = userUid.split('Bearer ')[1];



  const user = await getUser(userUid);

  // const user = await getUser(token);
  // console.log("Fetched User in Middleware:", user);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
