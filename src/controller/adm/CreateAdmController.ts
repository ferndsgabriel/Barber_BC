import { Request, Response } from "express";
import { CreateAdmServices } from "../../services/adm/CreateAdmServices";

class CreateAdmController{
    async handle(req:Request, res:Response){
        const {name, email, pass, cod, lastname, main, status} = req.body;
        const createAdmServices = new CreateAdmServices();
        const createAdm = await createAdmServices.execute({
            name, email, pass, cod, lastname, main, status
        });

        return res.json(createAdm);
    }
}
export {CreateAdmController}