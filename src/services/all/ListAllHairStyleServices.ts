import { prisma } from "../../prisma";

class ListAllHairStyleServices{
    async execute(){
        const listAll = await prisma.hairStyle.findMany({
        });

        return listAll;
    }
}

export {ListAllHairStyleServices}