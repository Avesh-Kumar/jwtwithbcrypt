import express from 'express';
const router=express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/authorization.js';
// middlewares
router.use('/changepassword',checkUserAuth);
router.use('/loggeduser',checkUserAuth)


//public router 
router.post('/register',UserController.userRegistration)

router.post('/login',UserController.userLogin);
router.post('/send-reset-password-email',UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',UserController.userPasswordReset);


//private  

router.post('/changepassword',UserController.changePassword);
router.get('/loggeduser',UserController.loggedUser);

export default router;