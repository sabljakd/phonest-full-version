const jwt = require('jsonwebtoken');
const User = require('../db/models/user')

const auth = async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'phonesApp')
        const user = await User.findOne({_id: decoded._id})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}


module.exports = auth