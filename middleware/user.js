const userModel = require("../model/user");
const userundenkil = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    next();
  }
};

const nouser = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

const userDel=async(req,res,next)=>{
  try{
    const user=await userModel.findOne({_id:req.session.user});
    if(user){
      next()
    }else{
      req.session.destroy()
      res.redirect('/login')
    }
  }catch(err){
    console.log(err.message)
  }
}
module.exports = { userundenkil, nouser,userDel };
