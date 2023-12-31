import { prisma } from "../../prisma";

interface AdicionalProps {
    description:string,
    price:number,
    timer:number,
    image:string,
    name:string
} 

class CreateAdditionalServices{
    async execute({description, price, timer, image, name}:AdicionalProps){
        if (!description || !price || !timer || !image || !name){
            throw new Error ('Envie todos os campos.');
        }

        const nameExist = await prisma.additional.findFirst({
            where:{
                name:name
            }
        });

        if (nameExist){
            throw new Error ('Já existe um corte com este nome.');
        }

        const createStyle = await prisma.additional.create({
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

export {CreateAdditionalServices}