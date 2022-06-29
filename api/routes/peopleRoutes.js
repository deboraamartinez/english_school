const { Router } = require('express')
const PersonController = require('../controllers/PersonController')


const router = Router()

router.get('/people', PersonController.getAllPeople)
router.get('/people/:id', PersonController.getOnePerson)
router.post('/people', PersonController.createPerson)
router.put('/people/:id', PersonController.updatePerson)
router.delete('/people/:id', PersonController.deletePerson)

router.get('/people/:studentId/enrollments/:enrollmentId', PersonController.getOneEnrollment)
router.post('/people/:studentId/enrollments', PersonController.createEnrollment)
router.put('/people/:studentId/enrollments/:enrollmentId', PersonController.updateEnrollment)
router.delete('/people/:studentId/enrollments/:enrollmentId', PersonController.deleteEnrollment)

module.exports = router