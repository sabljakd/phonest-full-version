const express = require('express');
const Komentar = require('../db/models/komentari.js');
const auth = require('../middleware/auth')


var KomentarRuta = new express.Router()

KomentarRuta.post('/api/komentar', auth, async (req, res) =>{
    var komentar = new Komentar({
        ...req.body,
        korisnik: req.user._id
    })
    try {
        await komentar.save()
        res.status(200).send(komentar)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})


KomentarRuta.patch('/api/komentar/:id', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const dozvoljenePromjene = ["sadrzaj"];
    const smijeLiSePromjeniti = updates.every((promjena) =>{
        return dozvoljenePromjene.includes(promjena)
    })
    if(!smijeLiSePromjeniti){
        return res.status(400).send()
    }
    try {
        const komentar = await Komentar.findOne({_id:req.params.id, korisnik: req.user._id})
        updates.forEach((promjena) => komentar[promjena] = req.body[promjena])
        
        await komentar.save()
        if(!komentar){
            return res.status(404).send()
        }
        res.send(komentar)
    } catch (error) {
        res.status(400).send(error)
    }
})

KomentarRuta.delete('/api/komentar/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentar = await Komentar.findOneAndDelete({_id, korisnik: req.user._id})
        if(!komentar){
            return res.status(404).send()
        }
        res.send(komentar)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = KomentarRuta