const { Router } = require('express')
const ClassController = require('../controllers/ClassController')


const router = Router()

router.get('/classes', ClassController.getAllClasses)
router.get('/classes/:id', ClassController.getOneClass)
router.post('/classes', ClassController.createClass)
router.put('/classes/:id', ClassController.updateClass)
router.delete('/classes/:id', ClassController.deleteClass)

module.exports = router