let express = require('express');
let app = express();
let routes = require('./routes');

//
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
let session = require('express-session');

//const { render } = require('ejs');

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized : true
}));

app.use('/', routes);

app.use('/login/:user', routes);

app.use('/login', routes);
app.listen(3000, function(){
    console.log('server is listening on port 3000')  
});

