import { Request, Response } from "express";
import { AuthAdmServices } from "../../services/adm/AuthAdmServices";

class AuthAdmController{
    async handle (req:Request, res:Response){
        const {email, pass} = req.body;
        const authAdmServices = new AuthAdmServices();
        const authAdm = await authAdmServices.execute({
            email, pass
        });

        return res.json(authAdm);
    }
}

export {AuthAdmController}