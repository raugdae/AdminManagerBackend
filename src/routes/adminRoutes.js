import express, { Router } from 'express';
import {authenticateToken, authorizeRole} from '../middleware/auth.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole('admin'));


router.get('/allEvents',adminController.getAllEvents);
router.get('/event/:eventid/attendees',adminController.getAllAttendeeFromEvent);
router.get('/event/:eventid/countAttendees',adminController.getCountOfAttendee);
router.get('/event/:eventid/getAttendeeByGroup/:groupid',adminController.getAttendeeByGroup);
router.get('/person/getAllPerson',adminController.getAllPerson);
router.get('/data/getAllergenList',adminController.getAllergenList);
router.get('/person/:personid/getPersonAllergens',adminController.getPersonAllergens); 

router.post('/event/newEvent',adminController.newEvent);
router.post('/event/:eventid/addgroup',adminController.addNewGroup);
router.post('/event/:eventid/addChildGroup/',adminController.addNewChildGroup);
router.post('/group/addAttendee',adminController.addAttendeeToGroup);
router.post('/person/addPerson',adminController.addPerson);
router.post('/person/:personid/addAllergen',adminController.addAllergenToPerson);

router.patch('/person/:personid/updateProfile',adminController.updatePersonData);
router.patch('/person/:personid/updateAllergen',adminController.updatePersonAllergen);
router.patch('/event/:eventid/updateInfomaniakTicketing',adminController.updateInfomaniakTicketing)

export default router;