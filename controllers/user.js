const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth.js");

const User = require("../models/user.js");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  //statefull authentication
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);
  
  //stateless authentication
  
  const token = setUser(user);
  //for browser websites we use cookies
  res.cookie("token", token);
  return res.redirect("/");
  // console.log(sessionId)

  //for mobile aplication we use headers 
  // return res.json({token});
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};