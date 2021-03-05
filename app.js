console.log("hi");

const cbw = require('../src/clothes-by-weather') // Module.exports
import cbw from 'clothes-by-weather' // Import/Export/es6 modules
 
const output = cbw({
    temperature: 10, // 10 deg celsius
    pop: 0.70, // 70% chance of precipitation
    description: 'cloudy', // Description from the weather API
    windGust: 5, // 5 meter per second
})
 
/* output = { 
    upperbody: [ 'warm jacket', 'sweater' ],
    lowerbody: 'pants',
    shoes: 'boots',
    misc: [ 'umbrella' ] 
   }
*/

MongoClient.connect({
  "host": process.env.DBhostname,
  "name": process.env.DBusername,
  "password": process.env.DBpassword
});


const MongoClient = require('mongodb').MongoClient;
const uri = mongodb+srv://soofg:
password@matchingappsofya.u42hk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

connectDB()
    .then(() => {
        // if succesfull connections is made, show a message
        console.log('We have a connection to Mongo!')
    })
    .catch(error => {
        // if connnection is unsuccesful, show errors
        console.log(error)
    });

