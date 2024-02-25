const express = require('express');
const router = express.Router();
const user=require('../controller/user')

/* GET home page. */
router.get('/',user.slash );
router.get('/login',user.userLogin );
router.get('/signup',user.signup)
router.post('/signup',user.getinsignup)
router.post('/login',user.getinlogin)
router.get('/home',user.home)
router.post('/Logout',user.Logout)
module.exports = router;
