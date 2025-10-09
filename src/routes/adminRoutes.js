import express, { Router } from 'express';
import {authenticateToken, authorizeRole} from '../middleware/auth.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole('admin'));

<<<<<<< HEAD
//GET routes
=======

>>>>>>> a5f5d6152e79a06531e5ed9680e610ebf7c66190
router.get('/allEvents',adminController.getAllEvents);
router.get('/event/:eventid/attendees',adminController.getAllAttendeeFromEvent);
router.get('/event/:eventid/countAttendees',adminController.getCountOfAttendee);
router.get('/event/:eventid/getAttendeeByGroup/:groupid',adminController.getAttendeeByGroup);

router.get('/person/getAllPerson',adminController.getAllPerson);
router.get('/person/:personid/getPersonAllergens',adminController.getPersonAllergens); 

router.get('/data/getAllergenList',adminController.getAllergenList);


// POST routes
router.post('/event/newEvent',adminController.newEvent);
router.post('/event/:eventid/addgroup',adminController.addNewGroup);
router.post('/event/:eventid/addChildGroup/',adminController.addNewChildGroup);
<<<<<<< HEAD

router.post('/group/addUser',adminController.addAttendeeToGroup);

=======
router.post('/group/addAttendee',adminController.addAttendeeToGroup);
>>>>>>> a5f5d6152e79a06531e5ed9680e610ebf7c66190
router.post('/person/addPerson',adminController.addPerson);
router.post('/person/:personid/addAllergen',adminController.addAllergenToPerson);

//PATCH routes
router.patch('/event/:eventid/updateInfomaniakTicketing',adminController.updateInfomaniakTicketing)

router.patch('/person/:personid/updateProfile',adminController.updatePersonData);
router.patch('/person/:personid/updateAllergen',adminController.updatePersonAllergen);

//DELETE routes
router.delete('/person/:personid/removeAllergen',adminController.deletePersonAlergen);


export default router;