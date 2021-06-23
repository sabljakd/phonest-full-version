const express = require('express');
const Phone = require('../db/models/phones.js');
const Komentar = require('../db/models/komentari.js');
const multer = require('multer')
const auth = require('../middleware/auth')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(null, false)
        }

        cb(undefined, true)
    }
})



var phoneRuta = new express.Router()


phoneRuta.post('/api/phone', auth, upload.single('slika'), async (req, res) =>{
   
    try {
        if(!req.file) return res.status(500).send({error: 'Odaberite sliku'})
        console.log(req.file.buffer)
        var phone = new Phone({
            ...req.body,
            image: req.file.buffer,
            korisnik: req.user._id
        })
       
        await phone.save()
        res.status(200).send(phone)
    } catch (error) {
        console.log(error);
      
        res.status(500).send({error: error.message})
    }
})


phoneRuta.get('/api/phone', async (req, res) =>{
    const match = {}
 
    if(req.query.pretraga != null && req.query.pretraga != 'undefined'){
        let termin = new RegExp(`^.*${req.query.pretraga}.*$`, "img")
        match['title'] = termin
    }
    try {
        console.log(match);
   
        var phones = await Phone.find(match, null).limit(5).skip(parseInt(req.query.skip) * 5)
        if(phones.length === 0) return res.status(404).send("Nema recenzija")
        res.send({phones})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

phoneRuta.get('/api/me/phone', auth, async (req, res) =>{
    try {
        let adminPhones = await Phone.find({korisnik: req.user._id}).limit(5).skip(parseInt(req.query.skip) * 5)

        if(!adminPhones) return res.status(404).send("Nemate objavljenih recenzija")

        res.status(200).send(adminPhones)
    } catch (error) {
        res.status(500).send(error)
    }
})

phoneRuta.get('/api/phone/:id/slika', async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id)
        if (!phone || !phone.image) {
            throw new Error("Error sa slikom")
        }
        res.set('Content-Type', 'image/png')
        res.send(phone.image)
    } catch (e) {
        res.status(404).send(e)
    }
})


phoneRuta.get('/api/phone/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const phone = await Phone.findOne({_id});
        if(!phone){
            return res.status(404).send({error: "Recenzija ne postoji"})
        }
        res.send(phone)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


phoneRuta.get('/api/phone/:id/komentari', async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentari = await Komentar.find({postId: _id});
        if(!komentari){
            return res.status(404).send({error: "Recenzija ne postoji"})
        }
        res.send(komentari)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


phoneRuta.patch('/api/phone/:id', auth, async (req, res) =>{
    console.log("patch", req.body);
    
    const updates = Object.keys(req.body)
    console.log(updates);

    const dozvoljenePromjene = ["title", "category", "content"];
    const smijeLiSePromjeniti = updates.every((promjena) =>{
        return dozvoljenePromjene.includes(promjena)
    })
    console.log(smijeLiSePromjeniti);
    if(!smijeLiSePromjeniti){
        return res.status(400)
    }
    try {
       
        const phone = await Phone.findOne({_id:req.params.id, korisnik: req.user._id})
        updates.forEach((promjena) => phone[promjena] = req.body[promjena])
        
        await phone.save()
        if(!phone){
            return res.status(404).send()
        }
        res.send(phone)
    } catch (error) {
        res.status(400).send(error)
    }
})


phoneRuta.delete('/api/phone/:id', auth, async (req, res) =>{
    console.log(req.user);
    const _id = req.params.id;
    try {
        const phone = await Phone.findOne({_id, korisnik: req.user._id})
        if(!phone){
            return res.status(404).send()
        }
        await phone.remove()
        res.send(phone)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = phoneRuta