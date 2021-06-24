const express = require('express');
const cors = require('cors');
require('./db/baza')

const Phones = require('./rute/phonesRuta');
const Komentar = require('./rute/komentariRuta');
const UserRuta = require('./rute/user');


const app  = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.use(Phones)
app.use(Komentar)
app.use(UserRuta)

// Handle production
if(process.env.NODE_ENV === 'production'){
    //static folder
    app.use(express.static(__dirname + '/public/'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


app.listen(port, () =>{
    console.log(`Server je na portu ${port}`);
})