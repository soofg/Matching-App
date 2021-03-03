console.log("hii")

//imports
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const port = 3000;

//Listen on port
app.listen(3000, () => {
    console.log('Express web app on localhost:3000');
    });

// Static files

app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('public/js'));
app.use('/css', express.static(__dirname + 'public/css')); //link naar je css folder
app.use('/js', express.static(__dirname + 'public/js')); //link naar je js folder
app.use('/images', express.static(__dirname + 'public/images')); //link naar je images folder
app.use(bodyParser.urlencoded({ extended: false }))


const categories = ["dress", "skirt", "pants"];

const clothes = ["straplessdress", "leatherskirt", "jeans"];

const maketheoutfit = [
  { "id": "straplessdress", "name": "Strapless Dress", "material": "Polyester",  "image": "/public/images/homeimage.png", "categories": ["dress"],"merk": "H&M"},
  { "id": "leatherskirt", "name": "Leather Skirt", "material": "Leather", "image": "/public/images/homeimage.png", "categories": ["skirt"],"merk": "ZARA"},
  { "id": "jeans", "name": "Jeans", "material": "Jeans",  "image": "/public/images/homeimage.png", "categories": ["pants"],"merk": "Bershka"},
];


//(EJS)Display je html op je localhost (omdat de index in de root van ons document zit, hoef je het niet te specificeren in de app.get('',))
app.get('',(req, res) => {
    res.render('index', {text: 'Find Friends'})
});
app.get('',(req, res) => {
    res.render('index', {text: 'Help finding outfits for occassions'})
});

app.get('/menu',(req, res) => {
    res.render('menu', {text: 'Suprise Suprise, welcome on this page everyone.'})
})

app.get('/maketheoutfit',(req, res) => {
    res.render('maketheoutfit', {text: 'What To Wear', maketheoutfit})
});

app.get('/maketheoutfit/:clothingdetailsId',(req, res) => { //detailpagina
    const clothes = maketheoutfit.find( maketheoutfit => clothes.id == req.params.clothingdetailsId);
    res.render('clothingdetails', {title: 'Clothing Details', clothes});
});

app.get('/outfithelprequest',(req, res) => {
    res.render('outfithelprequest', {title: "Hi"});
});

app.post('/outfithelprequest',(req, res) => {
    console.log(req.body.location)
    res.render('sendOutfitrequest', {title: "Request has been sent!"});
});


// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')


// routing
app.get('/', (req, res) => { // homepage
res.send('MatchingApp (Sofya Gerges)');
});

app.get('/menu', (req, res) => { 
    res.send('Formulier')
});

app.get('/maketheoutfit', (req, res) => { //choose the clothes for a request (give advice)
    res.send('Formulier')
});

app.get('/maketheoutfit/:clothingdetailsId', (req, res) => {
    res.render('clothingdetails', {title: "Clothing details", maketheoutfit});
    res.send(`<h1>Detailpage of the ${req.params.maketheoutfitId}</h1>`)
});

app.get('/outfithelprequest', (req, res) => { 
    res.send('Formulier')
});

app.get('/friends', (req, res) => { // andere gebruikers die een request gaan adviseren
    res.send('choose matching clothes')
});


app.get('/sendadvice', (req, res) => {
    res.send('Formulier')
});

app.get('/clothingadvicesreceived', (req, res) => {
    res.send('Formulierr')
});

    app.use(function (req, res, next) {
    res.status(404).send("404 Not Found")
});

//

app.set('view engine','ejs');
let ejs = require('ejs');




