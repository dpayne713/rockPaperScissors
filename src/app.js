
const express = require('express'); 
const hbs = require('hbs'); 
const path = require('path'); 

const app = express(); 

const viewsPath = path.join(__dirname, '/views'); 
const publicPath = path.join(__dirname, '/public');

app.use(express.static(publicPath)); 

app.set('view engine', 'hbs'); 
app.set('views', viewsPath); 

app.get('/', (req,res)=> {
    res.render('index')
}); 

app.get('/rps', (req,res)=> {
    res.render('rps'); 
});

app.get('/rpsls', (req,res)=> {
    res.render('rpsls'); 
})

app.listen(process.env.PORT|| 3000, ()=> {
    console.log('server started'); 
});
