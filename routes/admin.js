const express = require('express');
const router = express.Router();
const admin=require('../controller/admin')
const adminmiddleware=require('../middleware/admin')

/* GET users listing. */
router.get('/',adminmiddleware,admin.admin);
router.get('/delete/:id',adminmiddleware,admin.delet)
router.post('/create',admin.create)
router.post('/edit/:id',admin.edit)
router.get('/search/',admin.search)

module.exports = router;
