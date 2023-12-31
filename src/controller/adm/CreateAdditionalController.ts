import { Request, Response } from "express";
import { CreateAdditionalServices } from "../../services/adm/CreateAdditionalServices";

class CreateAdditionalController {
    async handle(req: Request, res: Response) {
        const { description, price, timer, name } = req.body;

        const {firebaseUrl}:any = req.file ? req.file : ''
        if (!req.file ) {
            throw new Error('Imagem não localizada!');
        }

        const isFullNumberPrice = parseFloat(price);
        const isFullNumberTimer = parseInt(timer);

        const createAdditionalServices = new CreateAdditionalServices();
        const CreateAdditional = await createAdditionalServices.execute({
            description,
            price:isFullNumberPrice,
            timer:isFullNumberTimer,
            name,
            image: firebaseUrl
        });

        return res.status(201).json(CreateAdditional) ;
        
    }
}

export { CreateAdditionalController };
