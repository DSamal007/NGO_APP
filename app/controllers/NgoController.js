const NGO = require('../models/NgoModel')

module.exports.create = (req,res) => {
    const { body } = req    
    const ngo = new NGO(body)
    ngo.save()
        .then((ngo) => {
            res.json(ngo)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.list = (req,res) => {    
    NGO.find({})
        .then((ngo) => {
            res.json(ngo)
        })
        .catch((err) => {
            res.json(err)
        })
}

// shoe a single ngo details
module.exports.show = (req,res) => {
    const id = req.params.id   
    Promise.all([NGO.findOne({_id: id})])
        .then((values) => {
            const [ngo] = values
            const ngoObj = ngo.toObject()            
            res.send(ngoObj)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body } = req
    NGO.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true}).select('address claimed name logoURL email')
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
}