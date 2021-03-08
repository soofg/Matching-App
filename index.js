console.log("hii")

//imports
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Clothes = require('./models/clothes');

// verbinden met de mongo database
let db = null;
// function connectDB
async function connectDB() {
    // get URI from .env file
    const uri = process.env.DATABASECONNECT
    // make connection to database
    const options = { useUnifiedTopology: true };
    const client = new MongoClient(uri, options)
    await client.connect();
    db = await client.db(process.env.DATABASENAME)
}

// een 'test' om te achterhalen of de database is verbonden
connectDB()
    .then(() => {
        // if succesfull connections is made, show a message
        console.log('We have a connection to Mongo!')
    })
    .catch(error => {
        // if connnection is unsuccesful, show errors
        console.log(error)
    });


mongoose.connect((process.env.DATABASECONNECT),  { useUnifiedTopology: true, useNewUrlParser: true}) //voor de errors in terminal (deprication warnings)
 .then((result) => { console.log('We have a connection to db!')
})
.catch((error )=> { console.log(error)
})
        



// dit is waar de applicatie zich bevindt, hij 'luistert op port 3000, daar wordt de app weergegeven.
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


//(EJS)Display je html op je localhost (omdat de index in de root van ons document zit, hoef je het niet te specificeren in de app.get('',))
app.get('', (req, res) => {
    res.render('index', { text: 'Find Friends' })
});
app.get('', (req, res) => {
    res.render('index', { text: 'Help finding outfits for occassions' })
});

app.get('/menu', (req, res) => {
    res.render('menu', { text: ' ' })
})

//--
// async: 
    // let: 
    //await: Start pas als alles is geladen 
    // db: database > collection: submapje in je database die in dit geval informatie heeft over kleding
    //find: zoeken (in dit geval in de database)
    // ingevulde sort ziet er uit als {sort: {merk: -1, name: 1})} : geeft de volgorde van wat onder moet en wat bovenaan
    //toArray: een array ervan maken, in de database hebben we het gezet met [] > zie maketheoutfit.json
app.get('/maketheoutfit', async (req, res) => {
    let maketheoutfit = {} // data vanuit de database
    maketheoutfit = await db.collection('clothes').find({},{sort: {}}).toArray();
    res.render('maketheoutfit', { text: 'What To Wear', maketheoutfit })
});

app.post('/maketheoutfit/:ClothedId', async (req, res) => {
    clothes = await db.collection('clothes').find({}).toArray();
    console.log(req.body.merken);
    console.log(req.body.categories);

    let merken = {}
    let categories = {}
    maketheoutfit = clothes.find(clothes => { return clothes.id === req.body.merken})
    maketheoutfit = clothes.find(clothes => { return clothes.id === req.body.categories})
    res.render('maketheoutfitresults', {});
});



app.get('/maketheoutfit/:clothesId', async (req, res) => { 
    const clothes = await db.collection('clothes').findOne({ id: req.params.clothesId });
    res.render('clothingdetails', { title: 'Clothing Details', clothes });
});


app.get('/outfithelprequest', (req, res) => {
    res.render('outfithelprequest', { title: "Hi" });
});

app.get('/maketheoutfit/chosenclothing', (req, res) => {
    console.log("laden gelukt");
    res.render('chosenclothing', { title: "Hi" });
});


app.post('/outfithelprequest', (req, res) => {
    res.render('sendOutfitrequest', { title: "Request has been sent!" });
});


// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')


// routing


app.use(function (req, res, next) {
    res.status(404).send("404 Not Found")
});

//

app.set('view engine', 'ejs');
let ejs = require('ejs');




