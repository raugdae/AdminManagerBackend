import express, { Router } from 'express';
import {authenticateToken, authorizeRole} from '../middleware/auth.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole('admin'));


router.get('/allEvent',adminController.getAllEvents);
router.get('/event/:id/attendees',adminController.getAllAttendeeFromEvent);
router.get('/event/:id/countAttendees',adminController.getCountOfAttendee);
router.get('/event/:id/getAttendeeByGroup/:groupid',adminController.getAttendeeByGroup);




router.post('/event/newEvent',adminController.newEvent);
router.post('/event/:id/addgroup',adminController.addNewGroup);
router.post('/event/:id/addChildGroup/',adminController.addNewChildGroup);

export default router;