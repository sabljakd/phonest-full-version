const mongoose = require('mongoose');


mongoose.connect( 'mongodb+srv://admin:admin@phonest.gprfu.mongodb.net/phonestapp?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})





