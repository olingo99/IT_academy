let express = require('express');
//express().use(express.static(__dirname + '/public/css'));

let router = express.Router();

let userController = require('./controller/userController');
let panierController = require('./controller/panierController');
let catalogueController = require('./controller/catalogueController');

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
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
// router.post('/add', (request, response)=>{
//     let item = request.body.newItem;
//         if (item != ''){
//             state = 'succes'
//             connection.query("INSERT INTO taches SET ?;", {"tache": item}, function(err, result){
//                 if (err) console.log(err);
//                 response.redirect('/');
//             });
//         }
//         else{
//             state = 'error'
//             response.render('home.ejs', {taches, state})
//         }
// });

module.exports = router;