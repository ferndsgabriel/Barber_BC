import { Router, Request, Response } from 'express';
import { UserMiddleware } from './Middewares/UserMiddleware';
import { AdmMiddleware } from './Middewares/AdmMiddleware';
import multer from "multer";
import uploadMiddlewareInstance from './Middewares/FirebaseMiddlwere';


const router = Router();

const Multer = multer({
    storage:multer.memoryStorage()
});

// user details
import { DetailsUserController } from './controller/user/DetailsUserController';
router.get('/userdetails', UserMiddleware, new DetailsUserController().handle);

/////////////////////////////////////////// -- ADM -- //////////////////////////////////////////////
// adm create 
import { CreateAdmController } from './controller/adm/CreateAdmController';
router.post('/createadm', new CreateAdmController().handle);
// adm auth
import { AuthAdmController } from './controller/adm/AuthAdmController';
router.post('/authadm', new AuthAdmController().handle);
// adm details
import { DetailsAdmController } from './controller/adm/DetailsAdmController';
router.get('/admdetails', AdmMiddleware, new DetailsAdmController().handle);
// adm createStyle
import { CreateHairStyleController } from './controller/adm/CreateHairStyleController';
router.post('/hairstyle', AdmMiddleware, Multer.single('image'), uploadMiddlewareInstance, new CreateHairStyleController().handle );
// adm edit Style
import { EditHairController } from './controller/adm/EditHairController';
router.put('/hairstyle', AdmMiddleware, Multer.single('image'), uploadMiddlewareInstance, new EditHairController().handle );
// adm create Additional
import { CreateAdditionalController } from './controller/adm/CreateAdditionalController';
router.post('/additional', AdmMiddleware, Multer.single('image'), uploadMiddlewareInstance, new CreateAdditionalController().handle );
// adm edit additional
import { EditAdditionalController } from './controller/adm/EditAdditionalController';
router.put('/additional', AdmMiddleware, Multer.single('image'), uploadMiddlewareInstance, new EditAdditionalController().handle );
// adm list new users
import { ListNewUsersController } from './controller/adm/ListNewUsersController';
router.get('/newusers', AdmMiddleware, new ListNewUsersController().handle);
// adm set new users status
import { SetNewUsersController } from './controller/adm/SetNewUsersController';
router.put('/newusers', AdmMiddleware, new SetNewUsersController().handle);
// adm list new collaborators 
import { ListNewCollaboratorsController } from './controller/adm/ListNewCollaboratorsController';
router.get('/newcollaborators', AdmMiddleware, new ListNewCollaboratorsController().handle);
// adm set new collaborators status
import { SetNewCollaboratorsController } from './controller/adm/SetNewCollaboratorsController';
router.put('/newcollaborators', AdmMiddleware, new SetNewCollaboratorsController().handle);



////////////////////////////// All ////////////////////////////////////////////////////
// list all styles 
import { ListAllHairStyleController } from './controller/all/ListAllHairStyleController';
router.get('/userhairstyle', UserMiddleware, new ListAllHairStyleController().handle);
router.get('/admhairstyle', AdmMiddleware, new ListAllHairStyleController().handle);
// list all additional
import { ListAddicionaController } from './controller/all/ListAddicionaController';
router.get('/useradditional', UserMiddleware, new ListAddicionaController().handle);
router.get('/admadditional', AdmMiddleware, new ListAddicionaController().handle);

export {router};



