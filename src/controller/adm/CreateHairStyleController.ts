import { Request, Response } from "express";
import { CreateHairStyleServices } from "../../services/adm/CreateHairStyleServices";

class CreateHairStyleController {
    async handle(req: Request, res: Response) {
        const { description, price, timer, name } = req.body;

        const {firebaseUrl}:any = req.file ? req.file : ''
        if (!req.file ) {
            throw new Error('Imagem não localizada!');
        }

        const createHairStyleServices = new CreateHairStyleServices();

        const isFullNumberPrice = parseFloat(price);
        const isFullNumberTimer = parseInt(timer);

        const createHairStyle = await createHairStyleServices.execute({
            description,
            price:isFullNumberPrice,
            timer:isFullNumberTimer,
            name,
            image: firebaseUrl
        });

        return res.status(201).json(createHairStyle) ;
        
    }
}

export { CreateHairStyleController };
