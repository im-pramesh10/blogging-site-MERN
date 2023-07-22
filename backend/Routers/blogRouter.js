const express = require('express')
const blogController = require('../Controllers/blogController')
router = express.Router()

router
    .post('/',blogController.create)
    .get('/', blogController.getPages)
    .get('/:id',blogController.getOne)
    .patch('/:id',blogController.update)
    .delete('/:id',blogController.delete)
    

exports.router = router