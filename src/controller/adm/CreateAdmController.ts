import { Request, Response } from "express";
import { CreateAdmServices } from "../../services/adm/createAdmServices";


class CreateAdmController{
    async handle(req:Request, res:Response){
        const {name, email, pass, cod, lastname} = req.body;
        const createAdmServices = new CreateAdmServices();
        const createAdm = await createAdmServices.execute({
            name, email, pass, cod, lastname
        });

        return res.json(createAdm);
    }
}
export {CreateAdmController}