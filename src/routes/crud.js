const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const axios = require('axios')
const {response} = require("express")

class CRUD {
    constructor(title = '', description = '', authors = '', favourite = '', fileCover = '', fileName = '',  id = '') {
        this.description = description
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
        this.title = title
        this.id = id
    }
}

const stor = {
    crud: []
}

router.get('/', (req, res) => {
    const {crud} = stor
    res.render('crud/index.ejs',{
        title: 'Crud',
        cruds: crud
    })
})

router.get('/create', (req, res) => {
    res.render("crud/create", {
        title: "Crud | create",
        crud: {}
    })
})

router.post('/create', (req, res) => {
    const {crud} = stor
    const {title, description, authors, favourite, fileCover, fileName} = req.body
    let {id} = ''
    function gen_id() {
        id= ((req.body.title.length)+(req.body.title.length+2)).toString() + req.body.title.length.toString() + req.body.title.match(/\b(\w)/g).join('') + req.body.description.length.toString()
    }
    gen_id()
    const newCrud = new CRUD(title, description, authors, favourite, fileCover, fileName, id)
    crud.push(newCrud)

    res.redirect('/crud')
})

router.get('/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    const COUNTER_URL = process.env.COUNTER_URL || "http://localhost:5000"

    axios
        .post(`${COUNTER_URL}/counter/${id}/incr`)
        .then(resultIncr => {
            if(resultIncr.data.message === 'OK'){
                axios
                    .get(`${COUNTER_URL}/counter/${id}`)
                    .then(result => {
                        let cnts = result.data.count
                        res.render("crud/view", {
                            title: "Crud | view",
                            crud: crud[idx],
                            views: cnts
                        })
                    })
            }else{
                console.log('Error crud.js-67')
            }
        })
        .catch(err => res.json({tit: "error", ...err}))

    // res.render("crud/view", {
    //     title: "Crud | view",
    //     crud: crud[idx],
    //     views: cnts
    // })
})


router.get('/update/:id/', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    res.render("crud/update", {
        title: "Crud | view",
        crud: crud[idx]
    })
})

router.post('/update/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const {title, description, authors, favourite, fileCover, fileName} = req.body
    const idx = crud.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    crud[idx] = {
        ...crud[idx],
        title,
        description,
        authors,
        favourite,
        fileCover,
        fileName
    }
    res.redirect(`/crud/${id}`)
})


module.exports = router