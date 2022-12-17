const express = require('express')
const {v4: uuid} = require("uuid")
const router = express.Router()
const fileMulter = require('../middleware/file')
class CRUD {
    constructor(title = '', description = '', authors = '', favourite = '', fileCover = '', fileName = '', fileBook = '', id = uuid()) {
        this.description = description
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
        this.title = title
        this.fileBook = fileBook
        this.id = id
    }
}

const stor = {
    crud: []
}

router.get('/', (req, res) => {
    const {crud} = stor
    res.json(crud)
})
router.use(fileMulter.single('file'))
router.post('/', (req, res) => {

    const {crud} = stor
    const {path} = req.file
    const fileBook = {path}
    const {title, description, authors, favourite, fileCover, fileName} = req.body

    const newCrud = new CRUD(title, description, authors, favourite, fileCover, fileName, fileBook)
    crud.push(newCrud)
    res.status(201)
    res.json(newCrud)
})

router.get('/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(crud[idx])
    } else {
        res.status(404)
        res.json({"errcode":404,"errmsg":"not found"})
    }
})

router.get('/:id/download', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.download(crud[idx].fileBook.path)
    } else {
        res.status(404)
        res.json({"errcode":404,"errmsg":"not found"})
    }
})

router.delete('/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        crud.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json({"errcode":404,"errmsg":"not found"})
    }
})

router.put('/:id', (req, res) => {
    const {crud} = stor
    const {title, description, authors, favourite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        crud[idx] = {
            ...crud[idx],
            title,
            description,
            authors,
            favourite,
            fileCover,
            fileName,
        }
        res.json(crud[idx])
    } else {
        res.status(404)
        res.json({"errcode":404,"errmsg":"not found"})
    }
})

module.exports = router