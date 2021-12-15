let express = require('express');

let router = express.Router();

let userController = require('./controller/userController');
let panierController = require('./controller/panierController');
let catalogueController = require('./controller/catalogueController');

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'olingo',
    password:'olingoolingo',
    database: 'it_academy'
});


router.get('/', catalogueController.home);

router.post('/login', userController.sessionLogin);

router.get('/loginpage', catalogueController.loginpage);

router.get('/voirpanier', panierController.voirPanier)

router.get('/addpanier/:formaid', panierController.addPanier);

router.get('/removepanier/:formaid', panierController.removepanier);

router.get('/finaliser', panierController.finaliser)

router.post('/login2', userController.sessionLogin2)

module.exports = router;