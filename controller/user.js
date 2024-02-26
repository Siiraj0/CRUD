const userModel = require("../model/user");
const bycrypt = require('bcrypt');

//redirecting slash route
const slash=(req,res)=>{
  res.redirect('/login')
}

//login page rendering
const userLogin = function (req, res, next) {
  const msg=req.flash('msg')
  console.log(msg);
  res.render("user/login", { msg });
};

//signup page rendering
const signup = (req, res) => {
  const messege=req.flash('msg')
  res.render("user/signup",{messege});
};

//get in signup page
const getinsignup = async (req, res) => {
  const email=await userModel.findOne({email:req.body.email})
  if(email){
    req.flash('msg','email already exist')
    res.redirect('/signup')
  }else{

    const p=req.body.password
    const pass=await bycrypt.hash(p, 10);
  const create=await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: pass,

  });

 req.session.user=create._id
  res.redirect("/home");
  }
};

//get in login page
const getinlogin = async (req, res) => {
  try {
    const data = await userModel.findOne({ email: req.body.email });
    if (data) {
    const pass= await bycrypt.compare(req.body.password,data.password)

      if (pass) {
        if(data.isadmin){
          req.session.admin=data._id
          res.redirect('/admin')
        }else{
          req.session.user=data._id
          res.redirect('/home')
          
        }
      } else {
        req.flash('msg','password wrong')
        res.redirect("/login");
      }
    } else {
      req.flash('msg',"email not exist")
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error.messege + " getinlogin");
  }
};

//home page rendering
const home=async(req,res)=>{
 const user= await userModel.findOne({_id:req.session.user})
  res.render('user/home',{user})
}

//logOut
const Logout=(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
}



//exporting
module.exports = {
  userLogin,
  signup,
  getinsignup,
  getinlogin,
  home,
  slash,
  Logout,
};
