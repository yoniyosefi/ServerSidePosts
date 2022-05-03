const express = require('express');
const {createUser,userLogin} = require('../controllers/users');

const router= express.Router();

router.post('/singup',createUser);

router.post('/login',userLogin);

module.exports= router;