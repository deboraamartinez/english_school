const { Router } = require('express');
const PersonController = require('../controllers/PersonController');

const router = Router();

router
  .get('/people', PersonController.getAllActivePeople)
  .get('/people/all', PersonController.getAllPeople)
  .get('/people/:id', PersonController.getOnePerson)
  .get('/people/:studentId/enrollments', PersonController.getPersonEnrollments)
  .post('/people', PersonController.createPerson)
  .put('/people/:id', PersonController.updatePerson)
  .delete('/people/:id', PersonController.deletePerson)
  .post('/people/:id/restore', PersonController.restorePerson)

  .get('/people/:studentId/enrollments/:enrollmentId', PersonController.getOneEnrollment)
  .post('/people/:studentId/enrollments', PersonController.createEnrollment)
  .put('/people/:studentId/enrollments/:enrollmentId', PersonController.updateEnrollment)
  .delete('/people/:studentId/enrollments/:enrollmentId', PersonController.deleteEnrollment)

  .get('/people/enrollments/:classId/confirmed', PersonController.getEnrollmentsByClass)
  .get('/people/enrollments/full', PersonController.getFullyClasses);
module.exports = router;
