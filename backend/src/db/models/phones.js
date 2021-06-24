const mongoose = require('mongoose');
const Komentar = require('./komentari');

const PhoneSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Unesite naziv mobitela'],
        trim: true,
        minlength: 4,
    },
    category: {
        type: String,
        required: [true, 'Unesite kategoriju'],
        minlength: 4, 
    },
    display: {
        type: String,
        required: [true, 'Unesite rezoluciju ekrana'],
        minlength:4,
    },
    procesor: {
        type: String,
        required: [true, 'Unesite naziv procesora'],
        minlength:10,
    },
    memorija: {
        type: String,
        required: [true, 'Unesite količinu RAM memorije'],
        minlength: 3,
    },
    memorija2: {
        type: String,
        required: [true, 'Unesite količinu memorije uređaja'],
        minlength: 3,
    },
    content: {
        type: String,
        required: [true, 'Unesite content'],
        minlength: 4, 
    },
   korisnik:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' 
   },
   image: {
        type: Buffer,
    }
}, {
    timestamps: true
})


PhoneSchema.pre('remove', async function(next){
    const posts = this
    await Komentar.deleteMany({posts: posts._id})
    next()
})


const Phone = mongoose.model('Phone', PhoneSchema)


module.exports = Phone 