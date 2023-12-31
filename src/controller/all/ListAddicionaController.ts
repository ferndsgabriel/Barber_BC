import { ListAddicionalServices } from "../../services/all/ListAddicionalServices";
import { Request, Response } from "express";

class ListAddicionaController{
    async handle(req:Request, res:Response){
        const listAddicionalServices = new ListAddicionalServices();
        const listAddicional = await listAddicionalServices.execute();

        return res.json(listAddicional);
    }
}
export {ListAddicionaController}