import { Router, Request, Response } from 'express';
import { UserMiddleware } from './Middewares/UserMiddleware';
import { AmdMiddleware } from './Middewares/AmdMiddleware';
import { hash } from 'bcryptjs';
import multer from "multer";
import uploadMiddlewareInstance from './Middewares/FirebaseMiddlwere';

const router = Router();
const Multer = multer({
    storage:multer.memoryStorage()
});



// user details
import { DetailsUserController } from './controller/user/DetailsUserController';
router.get('/userdetails', UserMiddleware, new DetailsUserController().handle);

// adm create 
import { CreateAdmController } from './controller/adm/CreateAdmController';
router.post('/createadm', new CreateAdmController().handle);
// adm auth
import { AuthAdmController } from './controller/adm/AuthAdmController';
router.post('/authadm', new AuthAdmController().handle);
// adm details
import { DetailsAdmController } from './controller/adm/DetailsAdmController';
router.get('/admdetails', AmdMiddleware, new DetailsAdmController().handle);
// adm createStyle
import { CreateHairStyleController } from './controller/adm/CreateHairStyleController';
router.post('/hairstyle', AmdMiddleware, Multer.single('image'), uploadMiddlewareInstance, new CreateHairStyleController().handle );














router.post('/hash', async(req:Request, res:Response)=>{
    const adm = 'BarberDeveloperGabrielHash';
    const hashAdm = await hash (adm, 8);

    return console.log(hashAdm);
})
export {router};



