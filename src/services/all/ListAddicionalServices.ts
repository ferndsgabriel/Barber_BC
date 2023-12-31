import { prisma } from "../../prisma";

class ListAddicionalServices{
    async execute(){
        const listAll = await prisma.additional.findMany({
        });

        return listAll;
    }
}

export {ListAddicionalServices}