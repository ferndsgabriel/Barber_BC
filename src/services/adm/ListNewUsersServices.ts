import { prisma } from "../../prisma"

class ListNewUsersServices{
    async execute(){

        const allNewUsers = await prisma.user.findMany({
            where:{
                status:null,
            },select:{
                photo:true,
                name:true,
                email:true,
                id:true
            }
        });

        return (allNewUsers);

    }
}

export {ListNewUsersServices}