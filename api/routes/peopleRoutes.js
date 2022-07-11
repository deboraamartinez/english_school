const { Router } = require('express');
const PersonController = require('../controllers/PersonController');
const EnrollmentController = require('../controllers/EnrollmentController');

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

  .get('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.getOneEnrollment)
  .post('/people/:studentId/enrollments', EnrollmentController.createEnrollment)
  .post(
    '/people/:studentId/enrollments/:enrollmentId/restore',
    EnrollmentController.restoreEnrollment,
  )
  .put('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.updateEnrollment)
  .delete('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.deleteEnrollment)
  .post('/people/:studentId/cancel', PersonController.cancelPerson)

  .get('/people/enrollments/:classId/confirmed', EnrollmentController.getEnrollmentsByClass)
  .get('/people/enrollments/full', EnrollmentController.getFullClasses);

module.exports = router;
