import express from 'express';
const router=express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/authorization.js';

//public router 
router.post('/register',UserController.userRegistration)

router.post('/login',UserController.userLogin)


//private router

router.post('/changepassword',checkUserAuth,UserController.changePassword);

export default router;