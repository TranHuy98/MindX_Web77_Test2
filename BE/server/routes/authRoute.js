import { Router } from 'express';
import userController from '../controllers/userController.js';

const authRouter = Router();

authRouter.post('/login', userController.logIn); //dang nhap
authRouter.post('/logout', userController.logOut); //dang xuat
authRouter.post('/signup', userController.signUp); //dang ki


export default authRouter;