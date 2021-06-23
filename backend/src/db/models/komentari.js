const mongoose = require('mongoose');


const KomentarSchema = new mongoose.Schema({
    sadrzaj:{
        type: String,
        required: [true, 'Unesite sadržaj komentara'],
        trim: true,
        minlength: 4,
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Phones' 
    },
    korisnik:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' 
   },
}, {
    timestamps: true
})


const Komentar = mongoose.model('Komentar', KomentarSchema)


module.exports = Komentar 