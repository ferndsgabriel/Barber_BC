import { prisma } from "../../prisma";

interface userProps{
    id:string
}

class DetailsAdmServices{
    async execute({id}:userProps){
        if (!id){
            throw new Error ('Id não encontrado.');
        }

        const userExist = await prisma.adm.findFirst({
            where:{
                id:id
            },select:{
                email:true,
                id:true,
                name:true,
            }
        });

        if (!userExist){
            throw new Error('Usuário inválido!');
        }

        return (userExist);
    }
}
export {DetailsAdmServices}