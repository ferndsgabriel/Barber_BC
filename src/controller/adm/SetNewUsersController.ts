import { Request, Response } from "express";
import { SetNewUsersServices } from "../../services/adm/SetNewUsersServices";

class SetNewUsersController{
    async handle (req:Request, res:Response){
        const {id, status} = req.body;

        const setNewUsersServices = new SetNewUsersServices();
        const setNewuser = await setNewUsersServices.execute({
            id, status
        });

        return res.json (setNewuser);
    }
}
export {SetNewUsersController}