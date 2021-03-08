const mongoose = require('mongoose');
const Schema = mongoose.Schema; // een schema defineert de structuur van de data uit een collection uit je database

const clothesSchema = new Schema({
    id: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    categories: {
        type: Array,
        required: true
    },

})


const Clothes = mongoose.model('Clothes', clothesSchema);
module.export = Clothes;