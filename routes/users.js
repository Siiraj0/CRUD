const express = require('express');
const router = express.Router();
const user=require('../controller/user')
const usermiddleware=require('../middleware/user')



/* GET home page. */
router.get('/',user.slash );
router.get('/login',usermiddleware.userundenkil,user.userLogin );
router.get('/signup',usermiddleware.userundenkil,user.signup)
router.post('/signup',user.getinsignup)
router.post('/login',user.getinlogin)
router.get('/home',usermiddleware.nouser,user.home)
router.post('/Logout',user.Logout)
module.exports = router;
