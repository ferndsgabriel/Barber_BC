import { prisma } from "../../prisma"

class ListNewCollaboratorsServices{
    async execute(){
        const allCollaborators = await prisma.adm.findMany({
            where:{
                status:null
            },select:{
                email:true,
                id:true,
                name:true,
            }
        });
        
        return (allCollaborators);
    }
}

export {ListNewCollaboratorsServices}