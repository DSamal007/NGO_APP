const { User } = require('../models/User')
const _ = require('lodash')

// user registration
module.exports.register = (req,res) => {
    new User(req.body).save()
        .then((user) => {
            res.send(_.pick(user,['_id','username','email']))            
        })
        .catch((err) => {
            res.send(err)
        })
}

// user login
module.exports.login = (req,res) => {
    const { email, password } = req.body
    User.findByCredentials(email,password)
        .then((user) => {
            user.generateToken()
                .then((token) => {
                    res.send({token})
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

// user logout
module.exports.logout = (req,res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token: token}}})
        .then(() => {
            res.send('Successfully logged out')
        })
        .catch((err) => {
            res.send(err)
        })
}

//user account
// module.exports.account = (req,res) => {
//     const {_id,username,email} = req.user
//     Department.find({_id: req.user.department})
//     .then(dept=>{       
//         const department = {name : dept[0].name, id : dept[0]._id  }
//         res.json({_id,username,email,department})
//     })
// }
