import { ListNewUsersServices } from "../../services/adm/ListNewUsersServices";
import { Request, Response } from "express";

class ListNewUsersController{
    async handle(req:Request, res:Response){
        const listNewUsersServices = new ListNewUsersServices();
        const listNewUsers = await listNewUsersServices.execute();

        return res.json(listNewUsers);
    }
}

export {ListNewUsersController}