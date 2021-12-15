const Panier = require('../model/panierModel');
let User = require('../model/panierModel');
const userController = require('./userController');

var panier;
var users = [];

var mysql = require("mysql");
const { query } = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'olingo',
    password:'olingoolingo',
    database: 'it_academy'
});

exports.createPanier = function(inUser){
    users.push(inUser);
    inUser.addPanier(new Panier());
}

exports.removepanier = function(req,res){
    panier = getPanierById(req.session.id);
    panier.remove(req.params.formaid);
    res.redirect('/voirpanier');
};


exports.voirPanier = function(req, res){
    panier = getPanierById(req.session.id);
    if (panier.getListLenght()>0){
        let sql = "SELECT * FROM formations WHERE idformation IN (";
        let list = panier.getList();
        list.forEach(elem =>{
            sql+="?,";
        });
        sql = sql.slice(0,-1);
        sql+=")";
        connection.query(sql,panier.getList(), function(error, result){
            if (error){console.log(error);};
            res.render('panier.ejs',{list:result});
        });
    }
    else{
        res.render('panier.ejs',{list:[]});
    }
};

exports.addPanier = function(req, res){
    panier = getPanierById(req.session.id);
    if (!(panier.contains(parseInt(req.params.formaid)))){
        panier.add(parseInt(req.params.formaid));
    }
};

exports.finaliser = function(req, res){
    panier = getPanierById(req.session.id);
    if (typeof req.session.user != 'undefined'){
        querysql = "INSERT INTO personne_formation (id_formation, pseudo) VALUES";
        values = [];
        list = panier.getList();
        list.forEach(elem =>{
            querysql+=' (?, ?),';
            values.push(elem);
            values.push(req.session.user.toString());
        });
        querysql = querysql.slice(0,-1);
        querysql+=";";
        connection.query(querysql, values, function(error, result){Error
            if(error){
                if (error['code'] == 'ER_DUP_ENTRY'){
                    return res.render('end.ejs', {state: 'errordup'});
                }
                else {console.log(error); return res.render('end.ejs', {state: 'error'})}
            }

            else panier.vider();return res.render('end.ejs',{state:'succes'});
        })
    }
    else{
        userController.importUsers(users);
        res.render('connexion.ejs',{state:'finaliser'})
    }  
}

getPanierById = function(id){
    for (var i=0;i<users.length;i++){
        if (users[i].getId()==id.toString()){
            return users[i].getPanier();
        }
    }   
}