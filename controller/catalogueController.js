let Catalogue = require('../model/catalogueModel');
let panierController = require('../controller/panierController');
let userController = require('../controller/userController');
var mysql = require("mysql");
const { application } = require('express');
const User = require('../model/userModel');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'olingo',
    password:'olingoolingo',
    database: 'it_academy'
});


var catalogue;
var usersId =[];
var users = [];


//salut le git

exports.home = function(req, res) {
    connection.query("SELECT * FROM formations;", function(error, result){
        if (error) console.log(error);
        catalogue = new Catalogue(result);
        list_forma = catalogue.list_forma;
        res.render('home.ejs', {list_forma});
    })
    if (!(usersId.includes(req.session.id))){
        usersId.push(req.session.id);
        user = new User(req.session.id);
        users.push(user);
        panierController.createPanier(user);
    }
};

exports.loginpage = function(req,res){
    userController.importUsers(users);
    res.render('connexion.ejs',{state:'connexion'})
};

