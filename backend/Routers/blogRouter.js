const express = require('express')
const blogController = require('../Controllers/blogController')
const verifyJWT = require('../middlewares/verifyJWT')
const router = express.Router()

router
    .get('/', blogController.getPages)
    .get('/:id/comments', blogController.getComments)
    .get('/:id',blogController.getOne)

router.use(verifyJWT) // need to be authenticated to create, update, delete blogs

router
    .post('/', blogController.create)
    .patch('/:id', blogController.update)
    .delete('/:id', blogController.delete)
    
module.exports = router