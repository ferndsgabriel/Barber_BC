import { Request, Response } from "express";
import { ListNewCollaboratorsServices } from "../../services/adm/ListNewCollaboratorsServices";

class ListNewCollaboratorsController {
    async handle(req:Request, res:Response){
        const listNewCollaboratorsServices  = new ListNewCollaboratorsServices();
        const listNewCollaborators = await listNewCollaboratorsServices.execute();
        
        return res.json(listNewCollaborators);
    }
}

export {ListNewCollaboratorsController}