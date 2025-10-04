import express from 'express';
import * as userController from '../controllers/userController.js'

const router = express.Router();

router.get('/', userController.getInfo);
router.get('/:id/myprofile',userController.userProfile);
router.get('/:id/attendedEvent',userController.attendedEvent);



export default router;