import { ListAllHairStyleServices } from "../../services/all/ListAllHairStyleServices";
import { Request, Response } from "express";

class ListAllHairStyleController{
    async handle(req:Request, res:Response){
        const listAllHairStyleServices = new ListAllHairStyleServices();
        const listAllHairStyle = await listAllHairStyleServices.execute();

        return res.json(listAllHairStyle);
    }
}
export {ListAllHairStyleController}