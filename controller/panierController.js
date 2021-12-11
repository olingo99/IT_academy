const Panier = require('../model/panierModel');
let User = require('../model/panierModel');
const userController = require('./userController');

var panier;
var users = [];

var mysql = require("mysql");
const { query } = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'it_academy'
});

exports.createPanier = function(inUser){
    //console.log('oui');
    users.push(inUser);
    inUser.addPanier(new Panier());
}

exports.removepanier = function(req,res){
    console.log('formaid');
    console.log(req.params.formaid);
    panier = getPanierById(req.session.id);
    console.log('panier');
    panier.remove(req.params.formaid);
    console.log(panier);
    res.redirect('/voirpanier');
};


exports.voirPanier = function(req, res){
    panier = getPanierById(req.session.id);
    if (panier.getListLenght()>0){
    let final = [];
    list = panier.getList();
    list.forEach(Element =>{
        connection.query("SELECT * FROM formations WHERE idformation = ?",Element, function(error, result){
                final.push(result);
            })
    });
    setTimeout(function() {
        res.render('panier.ejs',{list:final});
    }, 10);}
    else{
        res.render('panier.ejs',{list:[]});
    }
};

exports.addPanier = function(req, res){
    console.log(getPanierById(req.session.id));
    panier = getPanierById(req.session.id);
    console.log('ici');
    console.log(panier);
    console.log(typeof panier);
    if (!(panier.contains(parseInt(req.params.formaid)))){
        panier.add(parseInt(req.params.formaid));
    }
//console.log(panier);
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
    //    console.log(querysql);
    //    console.log(values);
        connection.query(querysql, values, function(error, result){Error
            if(error){
                if (error['code'] == 'ER_DUP_ENTRY'){
                    res.render('end.ejs', {state: 'errordup'});
                }
                else {console.log(error); res.render('end.ejs', {state: 'error'})}
            }

            else panier.vider();res.render('end.ejs',{state:'succes'});
        })
    }
    else{
        userController.importUsers(users);
        res.render('connexion.ejs',{state:'finaliser'})
    }  
}

// getPanierById = function(id){
//     let res;
//     console.log(users);
// users.forEach(elem =>{
//     //console.log('elem');
//     //console.log(elem.getId());
//     if (elem.getId()==id.toString()){
//         //console.log('panierrrrrrrrrrrrrrrrrrrrrrr');
//         //console.log(elem.getPanier());
//         //console.log('test');
//         res = elem.getPanier();
//     }
// })
// return res;
// }

getPanierById = function(id){
    for (var i=0;i<users.length;i++){
        if (users[i].getId()==id.toString()){
            return users[i].getPanier();
        }
    }   
}