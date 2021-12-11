let User = require('../model/userModel')

let users;

exports.importUsers = function(userlist){
users = userlist;
}

exports.sessionLogin = function(req, res){
    console.log('salut cest ici');
    console.log(users);
    user = getUser(users, req.session.id)
    user.addPseudo(req.body.pseudo);
    req.session.user = user.pseudo;
    res.redirect('/');
};

exports.sessionLogin2 = function(req, res){
    user = getUser(users, req.session.id)
    user.addPseudo(req.body.pseudo);
    req.session.user = user.pseudo;
    res.redirect('/finaliser');
};

getUser = function(userslist, id){
    for (var i=0;i<userslist.length;i++){
        console.log(i);
        if (userslist[i].getId()==id.toString()){
            return userslist[i];
        }
    }   
}