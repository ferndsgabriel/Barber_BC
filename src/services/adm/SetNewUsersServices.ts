import { prisma } from "../../prisma";


interface setUsersProps{
    status:boolean,
    id:string
}

class SetNewUsersServices{
    async execute({id, status}:setUsersProps){
        if (!id || status === null || status === undefined){
            throw new Error ('Preencha os campos.');
        }

        const userExist = await prisma.user.findFirst({
            where:{
                id:id
            }
        });

        if (!userExist){
            throw new Error ("Usuário não encontrado.")
        }

        const updateStatus = await prisma.user.update({
            where:{
                id:id
            },data:{
                status:status
            },select:{
                name:true,
                status:true
            }
        });

        return (updateStatus);
    }
    
}
export {SetNewUsersServices}