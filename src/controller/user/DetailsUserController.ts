import { Request, Response } from "express"
import { DetailsUserServices } from "../../services/user/DetailsUserServices"

class DetailsUserController{
    async handle(req:Request, res:Response){
        const id = req.user_id
        const detailsUserServices = new DetailsUserServices();
        const detailsUser = await detailsUserServices.execute({
            id
        });
        return res.json(detailsUser);
    }
}

export {DetailsUserController}