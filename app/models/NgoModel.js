const mongoose = require('mongoose');
const Schema = mongoose.Schema
const NgoSchema = new Schema({
    logoURL: {
        type: String,
        required: 'Image URL can\'t be empty',
        unique: true
    },    
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    address: {
        line_1:{type : String, required : true},
        line_2:{type : String, required : true},
        city:{type : String, required : true},
        district:{type : String, required : true},
        pinCode:{ type : Number, required : true}
    },
    claimed: {
        type: Boolean,       
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }       
})
const NGO = mongoose.model('NGO', NgoSchema);
module.exports = NGO;
