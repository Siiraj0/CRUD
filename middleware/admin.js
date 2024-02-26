const nouser = (req, res, next) => {
    if (!req.session.admin) {
      res.redirect("/login");
    } else {
      next();
    }
  };


  module.exports=nouser