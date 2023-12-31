import { Request, Response } from "express";
import { SetNewCollaboratorsServices } from "../../services/adm/SetNewCollaboratorsServices";

class SetNewCollaboratorsController{
    async handle (req:Request, res:Response){
        const {id, status} = req.body;

        const setNewCollaboratorsServices = new SetNewCollaboratorsServices();
        const setNewCollaborators = await setNewCollaboratorsServices.execute({
            id, status
        });

        return res.json (setNewCollaborators);
    }
}
export {SetNewCollaboratorsController}