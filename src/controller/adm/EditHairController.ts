import { EditHairServices } from "../../services/adm/EditHairServices";
import { Request,Response } from "express";

class EditHairController{
    async handle(req:Request, res:Response){
        const { description, price, timer, name, id } = req.body;

        const {firebaseUrl}:any = req.file ? req.file : ''
        
        const isFullNumberPrice = parseFloat(price);
        const isFullNumberTimer = parseInt(timer);

        const editHairServices = new EditHairServices();
        
        const editHair = await editHairServices.execute({
            description,
            price:isFullNumberPrice,
            timer:isFullNumberTimer,
            name,
            image: firebaseUrl,
            id
        });

        return res.status(201).json(editHair) ;
    }
}
export {EditHairController}