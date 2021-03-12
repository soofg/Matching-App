console.log('hii');

// imports
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = 3000;
const { MongoClient, ObjectID } = require('mongodb');
const ejs = require('ejs');

// verbinden met de mongo database
let db = null;
// function connectDB
async function connectDB() {
  // get URI from .env file
  const uri = process.env.DATABASECONNECT;
  // make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
  db = await client.db(process.env.DATABASENAME);
}

// een 'test' om te achterhalen of de database is verbonden
connectDB()
  .then(() => {
    // if succesfull connections is made, show a message
    console.log('We have a connection to Mongo!');
  })
  .catch((error) => {
    // if connnection is unsuccesful, show errors
    console.log(error);
  });

// dit is waar de applicatie zich bevindt, hij 'luistert op port 3000, daar wordt de app weergegeven
// Listen on port
app.listen(3000, () => {
  console.log('Express web app on localhost:3000');
});

// Static files
app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('public/js'));
app.use('/css', express.static('/public/css')); // link naar je css folder
app.use('/js', express.static('/public/js')); // link naar je js folder
app.use('/images', express.static('public/images')); // link naar je images folder
app.use(bodyParser.urlencoded({ extended: false }));

// (EJS)Display je html op je localhost (omdat de index in de root van ons document zit,
// hoef je het niet te specificeren in de app.get('',))
app.get('', (req, res) => {
  res.render('index', { text: 'Find Friends' });
});

app.get('', (req, res) => {
  res.render('index', { text: 'Help finding outfits for occassions' });
});

app.get('/menu', (req, res) => {
  res.render('menu', { text: ' ' });
});

//laad kledingitems uit database wanneer we via get route maketheoutfit aanvragen.
app.get('/maketheoutfit', async (req, res) => {
  let maketheoutfit = {}; // data vanuit de database
  maketheoutfit = await db.collection('clothes').find({}, { sort: {} }).toArray();
  res.render('maketheoutfit', { text: 'What To Wear', maketheoutfit });
});

//filteren op een bepaald kledingitem
app.post('/maketheoutfit', async (req, res) => {
  const clothes = await db.collection('clothes').find({}).toArray();
  const clothingitems = clothes.filter((clothes) => clothes.merk.toLowerCase() === req.body.merken.toLowerCase() && clothes.categories.includes(req.body.categories.toLowerCase()));
  console.log(clothingitems);
  console.log(clothes);
  console.log(req.body.merken);
  console.log(req.body.categories);
  res.render('maketheoutfitresults', { title: 'Results' , maketheoutfit: clothingitems });
});

//pagina om gekozen producten op te slaan
app.get('/maketheoutfit/chosenclothing', async (req, res) => {
  const clothes = await db.collection('clothes');
  const savedItems = await db.collection('savedItems');
  const objectID = new ObjectID('604a14c5aabbc00b883fdc28');

  savedItems.findOne({ _id: objectID }, (err, savedItemsObject) => {
    if (err) {
      console.log(err);
    } else {
      clothes
        .find({ _id: { $in: savedItemsObject.saves } })
        .toArray((err, savedClothing) => {
          if (err) {
            console.log(err);
          } else {
            res.render('chosenclothing', {
              title: 'Saved Items',
              savedClothing,
            });
          }
        });
    }
  });
});

//aangeklikte kledingitems opslaan op de database om dan weer te geven op de chosenclothing pagina
app.post('/maketheoutfit/chosenclothing', async (req, res) => {
  const clothes = await db.collection('clothes');
  const savedItems = await db.collection('savedItems');
  const objectID = new ObjectID('604a14c5aabbc00b883fdc28');
  const savedItem = new ObjectID(req.body.saveit);

  await savedItems.update(
    { _id: objectID },
    { $push: { saves: savedItem } },
  );

  savedItems.findOne({ _id: objectID }, (err, savedItemsObject) => { // object id die nu in saveditems staat controleren
    if (err) {
      console.log(err);
    } else {
      clothes
        .find({ _id: { $in: savedItemsObject.saves } })
        .toArray((err, savedClothing) => {
          if (err) {
            console.log(err);
          } else {
            res.render('chosenclothing', {
              title: 'Saved Items',
              savedClothing,
            });
          }
        });
    }
  });
});

// detailpagina kleding
app.get('/maketheoutfit/:clothesId', async (req, res) => {
  const clothes = await db.collection('clothes').findOne({ id: req.params.clothesId });
  res.render('clothingdetails', { title: 'Clothing Details', clothes });
});

//----------------------------------------------
// formuliertje
app.get('/outfithelprequest', (req, res) => {
  res.render('outfithelprequest', { title: 'Hi' });
});

app.post('/outfithelprequest', (req, res) => {
  res.render('sendOutfitrequest', { title: 'Request has been sent!' });
});

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// routing

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

//

app.set('view engine', 'ejs');
