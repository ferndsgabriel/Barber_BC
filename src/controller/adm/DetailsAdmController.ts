import { Request, Response } from "express";
import { DetailsAdmServices } from "../../services/adm/DetailsAdmServices";

class DetailsAdmController{
    async handle(req:Request, res:Response){
        const id = req.body
        const detailsAdmServices  = new DetailsAdmServices();
        const detailsAdm = await detailsAdmServices.execute({
            id
        });

        return res.json(detailsAdm);
    }
}

export {DetailsAdmController}