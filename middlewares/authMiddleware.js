module.exports.isUser = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuth = (req, res, next) => {
  const authRoles = ["teacher", "admin"];
  if (authRoles.includes(req.session.userRole)) {
    next();
  } else {
    return res.status(401).json({
      status: "fail",
      error: "You Are Not Authorized",
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.session.userRole !== "admin") {
    return res.status(401).json({
      status: "fail",
      error: "You Are Not Authorized",
    });
  }
  next();
};
