const userModel = require("../model/user");
const bycrypt = require('bcrypt');

const admin =  async(req, res, next)=> {
  const msg=req.flash('msg')
  const userlist=await userModel.find({isadmin:false})
  res.render("admin/admin",{userlist,msg});
};

const delet= async(req,res)=>{
  try {
    await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/admin')
    
  } catch (error) {
    console.log(error.messege);
  }
}

const create=async(req,res)=>{
  try {
    const email=await userModel.findOne({email:req.body.email})
  if(email){
    req.flash('msg','email already exist')
    res.redirect('/admin')
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

  res.redirect('/admin')
    
  } catch (error) {
  console.log(error.messege);    
  }
}

const edit=async(req,res)=>{
  try {
    await userModel.findOneAndUpdate({_id:req.params.id},{$set:{name:req.body.name,email:req.body.email}});
    res.redirect('/admin')
  } catch (error) {
    console.log(error.messege);
  }
}

const search=async(req,res)=>{
  try {
    const searchItem=RegExp(req.query.id,'i')
    const val=await userModel.find({$and:[{$or:[{name:searchItem},{email:searchItem}]},{isadmin:false}]})
    res.send({val})
  } catch (error) {
    console.log(error.messege);
  }
}

module.exports = {
  admin,
  delet,
  create,
  edit,
  search,
};
