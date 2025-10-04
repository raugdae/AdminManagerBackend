import express, { Router } from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();


router.get('/allEvent',adminController.getAllEvents);
router.get('/event/:id/attendees',adminController.getAllAttendeeFromEvent);
router.get('/event/:id/countattendees',adminController.getCountOfAttendee);
router.get('/event/:id/addgroup/:groupname',adminController.addNewGroup);
router.post('/event/:id/addchildgroup/:parentgroupid/:groupname',adminController.addNewChildGroup);

export default router;