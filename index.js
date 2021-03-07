console.log("hii")

//imports
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;


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

connectDB()
    .then(() => {
        // if succesfull connections is made, show a message
        console.log('We have a connection to Mongo!')
    })
    .catch(error => {
        // if connnection is unsuccesful, show errors
        console.log(error)
    });




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

const clothes = [
    {
    "id": "straplessdress", 
    "id": "leatherskirt", 
    "id": "jeans"
    },
];


const maketheoutfit = [
    {
        "id": "straplessdress",
        "name": "Strapless Dress",
        "material": "Polyester",
        "image": "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe1%2F87%2Fe187ff58b4d75b5390fe4e30b68e2365d21f6053.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_dresses_maxidresses%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main",
        "categories": ["dress"],
        "merk": "H&M"
    },

    {
        "id": "leatherskirt",
        "name": "Leather Skirt",
        "material": "Leather",
        "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUQEBAPEBIQFxUVEBAPDw8PFQ8VFRIXFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0OFQ8NFSsdFRkrKysrLS0rLS0rKzcrKystKys3KystKysrKystKzcrLSsrKysrKy0rKysrKysrKysrK//AABEIARMAtwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQQCAwUHBgj/xABMEAACAQIDAQsGCQoDCQAAAAAAAQIDEQQhMRIFBgciQVFhcYGxwTJykaHC0RMUI1JTVJKy0hYzQmJjgpOUoqMVRPElNDVDc4OEs/D/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A9hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhyV7XV+a4EgAACBYCQRZ8wAAEAZAxFwMgY3JAkEEgALAAAAAAAAAAeO8Kk3/iKzV1QpqN3bWdRvM9hZ4twtNPdG3NQpdnGqPxLB83PHVo6uql+rUmu5mMd0pvTEYqPR8LN+JWpYmcMnxo8zNqVOeceK+ZlG14qs2rYmq7u3GqV17RLeJ0+ElL/AL1XxkYRp3aXLteyzZXko6vMDCEcRe+1J9dWXfqb6WLxMfJqVo+bi6q8Tl18W+QqyrSfKwO5W3Uxzy+N4hLLL4zUfJn+kZVN3se0oPG4hxi9I153+1e589eRlZ//AHUiaO/R3fx8dMbil/5FTxZsnvo3R+u4rsryPm1UaMvhCjty3xY3lxeL/mahr/x7F3v8axfbiq3vOVGZkmB1Jbv4z61if5mv+Iwnu/i3risV/MV/xHOnr6O4hQILNTdTES1r15edWqPvZ6lwLYicqWIjKUpJTg1tScrXi769SPJT1PgTeWJXTT7pAeoAAgAAAAQAZ4xwrw/2i23a9Cnbp4014HszPB9/+MdbdKur5QkqceqEEmvtKXpLBxsNsyVmTPAq907HPhJp5FuliV+l6SixGDS1u+fotbxNE8Knq2ba0s4pfpbVutWfgYxrc4Gv4kuc2wwcOUlvmFwNj+CStp02uU501JtpZJ2/pjn3lmNJOyZFktu2l191AVZ0YvRGv4vHqN18yHVQGr4uuczhh1zolVL6RubKcG9bRXrAqzjZ2Cgy1N6JdOfaxsdOYGiNM9J4FZZ4heZ7R51KXIff8DUl8LWV82o5dCb95B62ACAAABBJDAxk7Z8iPzVuliXOtKt9LOdT7U3LxP0HvlxXwWDxFTlhRqNdew7eux+e8TS+Tj0e4sGnE8Wo+Z5rqZMXcy3QheMJdFn2FbD1AN1Wo1KGvFuyxVs+MtGYOm7pq2aat259wwb1g+XToKJjI3RZqlDkIiBZga5vW/zvYiYbZk80/Of3Iga1mZbKRDTGyAdTkRg4vW5uUbchVrTAs0aTdNSjm3dNfvMrzg0btz5bS2H162M58ze0unVdoFVyPseCnE7GOUfpIyXbk/A+Oqqzsdjedifg8dQl+uk/3uL4kK/Q4Ii8iSAAABDJMWB8twl19jcuvzy2IfaqxT9Vzx3YvBI9S4YK+zufGP0lamuxRnL2UeYUnkuooq4iN6Lj8xpnH2rM78o+WudHCrw9QHT+FVlmr2v6WaZ5T9ZhhWuVJ5K3RmbsXHO5RYqK6uaG8zdh3dWNVRARNm7BZxl53sr3FabLO5uk+zuAykYtGxoxsBjPSxQxOp0WjmYnViizuU/lOv3CcuO487uNy9W/X1/6GEc6gDEeUzZgauxUhP5sov0STNVZ8ZmMdSD9N4Od4RfOkbjmb2623haUvnQi/wClHTIAAAghkshgea8Nda1HDU/nTnL7MYr2zz6L4sT7Lhsq/K4aHNCpL7UkvZPi5PiQ6ijOTzOdiKeZek8kzRiFylFWirMt4mN43KyLiziBXw8rG7ER5Sssi3e8OoCpPlLW5Gk/3fEqSZZ3GnnNdXiBYqqyMUbaxqASOVX1OniHkcysBZwGSbMcN5bfNcyou1NvnMKWUW+fJEGEmEYmQV77wf1drAUeiCXoy8D6Q+M4LKt8BBfNcl/Wz7MlQAAEEMkxYHjPDLUvjqcfm0Y+upNny7/NxfQdzhZqX3SmvmwpL+hS9o4a/MxKIoyyIqrI00J8hZnoUUmWaLyK80b8MBqmjbSfFZrqGyiuKwKszZuU+O+zxMJk7nO0pfu+IHTqaGpGxO8TVLJAacTIo1EW6jNMYXYGdXKKiRXyio9plbal0I0153kQYxMmRSRlU1CvYeCGpfCSXNOXcn4n355twPT+RqL9f2UekkqAAAgxZkYsDwXhOlfdOv0bC/tROXRd6Be4RJX3SxD/AF7eiKXgUMDK9GS5iiknZl5PI50nmXqMuKUaaqNmG1MahOH1AiuszbR8k11jbR8kCjVMtzvKl1LxMa2rG5740uzxA6cfJMKyyNiWRi1lYCoRFEuNmTGPKBE+LHpZSZvxVS7tzFcirWEiYVvKLWDhxWypPUqPUuB6XFqrpXcenI8t4H3+d649zPUkSiQAQYkMkhgfnrf077oYl/tZ+p2KG5malHoZd36Z47Ev9tV++yhuNK02udFFaosyzQlka8ZG0hQYG62RtoRMILI20SjVNeo20HkYSZnBZAUMTqYYD84+zxNmI1NeBXHfUvEK7C0IsYwnyEzYRpnE1VHZFiTdiliGBWkxBXMWb8JC8iK6UI2pnLep2J+S10HI5So9O4If+b1x7j1JHl3BEvzvnR+6eoolEggkgxIZJDA/PO+z/fcR/wBar99nJ3Odqi7Tsb7lbH4hftqn/sZxaeUr8zKLW6keMVqDLm6mai+soQYHQhpYmmYUTO9iiZImMgpXDhmrAUcQYYCdptvTK/RrYzxBOBhfb0/R9oC+knnfXmM3Eowi4st06lwMqryOVXldl3FTyObJgDobnQzuUIK7OzhYWj09IGOKnZM5kdS5jZZlOGoHqXBKuLU85fdR6cjzTgnXEqecvuo9LRKAAIIMWZMxYH5/38xtujX6as36ZNnF2bykuW112Hc4Q1bdGv579eZxKcvlI9OXpRRalHapLoOe9TqUE1tQfYc6vDMC1hWWJooYaZddQoh6Ge1kYVZGmpPpAr1pE4ZtKb8z2jB5ssTp7MZJcqh3yAVZNNPnN9GZXS2qafNkxhp3WfJqBGKKygWKsrmrZA2YenmddKy6jk4V52OpWlaLfQBzK0rtmmGpMXdsiGpB61wVx+Tn5/sRPRkefcF8fkpPnl7MT0FEAAAQzFmRDQHgPCL/AMRr9E/ZTPnJPJPmsfR8IlGa3QrylCcVKo9mUoySktE03qsj5tPivoKO1F3SbT0KtelbM30XxE0ZVc1nqUcp5MsUKvIYVIGqLAsVZ8xokr8pm2IgZUaaTXWWMa7TtzpX6k370a6flLrXea8dL5R9VvWBlgZpJp6MwrQSleN7PUxw97ll36ANainzmChqWacuoy9AFOnTaeTLeIrXgovXO/YY7Ji1dAVdCKWpnVRhDUg9m4NYWw6fO37vA+5R8Nwayvh+p+CfifcogkAAQGABhUpp65nPxO4uHnlOjSmuaVOEu9HSAHz896mD5MNRXVTiu40y3pYT6vS+yj6axFgPlJbzME9cPT9a8TVLeJgH/lodkqi7pH2GyNkD438gsB9XX8Sr+In8gsD9Av4lX8R9jsiwHx/5CYH6H+5V/ESt4eA+rxz1vOo++R9fYWA+UhvGwK0w8F2z95k95OC+gj9qp7z6mwsB8m94+C+g/uVfxGL3j4L6H+5V/EfXWFgPkVvJwX0C+3VftGcd5mCX+Xh27T72fVbI2QPmY70MH9WodtOLLFLexhFphcP/AAafuO/sk2AqYPBxpq0IxiuaKSXoRcRFiQJBAAAAAAAIBIAgEkAASAIBIAgEgCAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAEgAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAH//2Q==",
        "categories": ["skirt"],
        "merk": "ZARA"
    },

    {
        "id": "jeans",
        "name": "Jeans",
        "material": "Jeans",
        "image": "../public/images/homeimage.png",
        "categories": ["pants"],
        "merk": "Bershka"
    },
];


//(EJS)Display je html op je localhost (omdat de index in de root van ons document zit, hoef je het niet te specificeren in de app.get('',))
app.get('', (req, res) => {
    res.render('index', { text: 'Find Friends' })
});
app.get('', (req, res) => {
    res.render('index', { text: 'Help finding outfits for occassions' })
});

app.get('/menu', (req, res) => {
    res.render('menu', { text: 'Suprise Suprise, welcome on this page everyone.' })
})

app.get('/maketheoutfit', async (req, res) => {
    let maketheoutfit = {}
    // async: 
    // let: 
    //await: Start pas als alles is geladen 
    // db: database > collection: submapje in je database die in dit geval informatie heeft over kleding
    //find: zoeken (in dit geval in de database)
    // ingevulde sort ziet er uit als {sort: {merk: -1, name: 1})} : geeft de volgorde van wat onder moet en wat bovenaan
    //toArray: een array ervan maken, in de database hebben we het gezet met [] > zie maketheoutfit.json
    maketheoutfit = await db.collection('clothes').find({},{sort: {}}).toArray();
    res.render('maketheoutfit', { text: 'What To Wear', maketheoutfit })
});

app.get('/maketheoutfit', (req, res) => {
    res.render('maketheoutfit', {})
});

app.get('/maketheoutfit/:clothesId', (req, res) => { 
    const clothes = maketheoutfit.find( clothes => clothes.id == req.params.clothesId);
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
    console.log(req.body.location)
    res.render('sendOutfitrequest', { title: "Request has been sent!" });
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
    res.render('clothingdetails', { title: "Clothing details", maketheoutfit });
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
    res.send('Formulier')
});

app.use(function (req, res, next) {
    res.status(404).send("404 Not Found")
});

//

app.set('view engine', 'ejs');
let ejs = require('ejs');




