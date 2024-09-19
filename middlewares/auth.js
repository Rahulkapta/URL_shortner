const { getUser } = require("../service/auth");

async function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = await getUser(token);
  // console.log("Decoded token:", user);  
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    // console.log("User role in restrictTo:", req.user.role); 

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
//   // const userUid = req.headers["authorization"];
//   // const token = userUid.split('Bearer ')[1];

//   if(!userUid) return res.redirect("/login");

//   const user = await getUser(userUid);
//   // const user = await getUser(token);
//   // console.log("Fetched User in Middleware:", user);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;
//   // console.log("Cookie UID:", userUid);
//   // console.log(req.headers);

//   // const userUid = req.headers["authorization"]
//   // const token = userUid.split('Bearer ')[1];

//   const user = await getUser(userUid);

//   // const user = await getUser(token);
//   // console.log("Fetched User in Middleware:", user);
//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo,
};
