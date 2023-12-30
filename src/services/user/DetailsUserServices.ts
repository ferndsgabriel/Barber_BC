import { prisma } from "../../prisma";

interface userProps{
    id:string
}

class DetailsUserServices{
    async execute({id}:userProps){
        if (!id){
            throw new Error ('Id não encontrado.');
        }

        const userExist = await prisma.user.findFirst({
            where:{
                id:id
            },select:{
                email:true,
                id:true,
                name:true,
                photo:true,
                status:true,
            }
        });

        if (!userExist){
            throw new Error('Usuário inválido!');
        }

        return (userExist);
    }
}
export {DetailsUserServices}