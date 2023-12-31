import { prisma } from "../../prisma";

interface HairProps {
    id:string,
    description:string,
    timer:number,
    price:number,
    image:string,
    name:string
}
class EditHairServices{
    async execute({id, description, timer, price, image, name}:HairProps){
        
        if (!id){
            throw new Error ("Corte não encontrado.");
        }
        const styleExist = await prisma.hairStyle.findFirst({
            where:{
                id:id
            }
        });
        
        if (!styleExist){
            throw new Error ("Corte não encontrado.");
        }
        
        const newDescription = description === '' || description === undefined ? styleExist.description : description
        const newName = name === '' || name === undefined ? styleExist.name : name
        const newImage = image === '' || image === undefined ? styleExist.image : image
        const newTimer = timer !== undefined && isNaN(timer) ? styleExist.timer : timer
        const newPrice = price !== undefined && isNaN(price) ? styleExist.price : price

        const nameExist = await prisma.hairStyle.findFirst({
            where: {
                name: newName,
                id:{
                    not:styleExist.id
                }
            },select:{
                id:true,
                name:true
            }
        });
        
        if (nameExist){
            throw new Error ('Já existe um corte com este nome.');
        }
        
        const updateStyle = await prisma.hairStyle.update({
            where:{
                id:id
            },data:{
                description:newDescription,
                image:newImage,
                name:newName,
                timer:newTimer,
                price:newPrice
            }
        });

        return (updateStyle);
    }
}
export {EditHairServices}