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
