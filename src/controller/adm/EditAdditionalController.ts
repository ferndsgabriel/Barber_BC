import { EditAdditionalServices } from "../../services/adm/EditAdditionalServices";
import { Request,Response } from "express";

class EditAdditionalController{
    async handle(req:Request, res:Response){
        const { description, price, timer, name, id } = req.body;

        const {firebaseUrl}:any = req.file ? req.file : ''
        
        const isFullNumberPrice = parseFloat(price);
        const isFullNumberTimer = parseInt(timer);

        const editAdditionalServices = new EditAdditionalServices();

        const editAdditional = await editAdditionalServices.execute({
            description,
            price:isFullNumberPrice,
            timer:isFullNumberTimer,
            name,
            image: firebaseUrl,
            id
        });

        return res.status(201).json(editAdditional) ;
    }
}
export {EditAdditionalController}