import { prisma } from "../../prisma";

interface StyleProps {
    description:string,
    price:number,
    timer:number,
    image:string,
    name:string
} 

class CreateHairStyleServices{
    async execute({description, price, timer, image, name}:StyleProps){
        if (!description || !price || !timer || !image || !name){
            throw new Error ('Envie todos os campos.');
        }

        const nameExist = await prisma.hairStyle.findFirst({
            where:{
                name:name
            }
        });

        if (nameExist){
            throw new Error ('Já existe um corte com este nome.');
        }

        const createStyle = await prisma.hairStyle.create({
            data:{
                description,
                price,
                timer,
                image,
                name
            }
        });

        return createStyle;

    }

}

export {CreateHairStyleServices}