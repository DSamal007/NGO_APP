const mongoose = require('mongoose');
const configureDB = () =>{
    mongoose.Promise = global.Promise
    const CONNECTION_URI= process.env.MONGODB_URI || 'mongodb+srv://dsamal:dsamal123@cluster0-crjia.mongodb.net/test?retryWrites=true&w=majority';
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to Datatbase')
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = configureDB