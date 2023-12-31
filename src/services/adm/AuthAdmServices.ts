import { prisma } from "../../prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserProps { 
    email: string;
    pass:string
}
class AuthAdmServices{ 
    async execute({ email, pass }: AuthUserProps) {
        
        if (!email || !pass){
            throw new Error('Digite todos os campos.');
        }
        const userExist = await prisma.adm.findFirst({
            where:{
                email:email.toLowerCase()
            }
        });

        if (!userExist){
            throw new Error ('Dados inválidos.');
        }

        const passCompare = await compare (pass, userExist.pass);

        if(!passCompare){
            throw new Error ('Dados inválidos.');
        }

        if (userExist.status === null){
            throw new Error ('Usuário não válidado.');
        }
        if (userExist.status === false){
            throw new Error ('Usuário em análise.');
        }

        const token = sign({
            name:userExist.name,
            email:userExist.email
        },
        process.env.AJWT_SECRET,
        {
            subject:userExist.id,
            expiresIn:'30d'
        }
        );

        const hashToken = await hash(token, 8);

        const createTokendb = await prisma.token.create({
            data:{
                id:hashToken,
                adm_id:userExist.id,
            }
        })

        return ({id: userExist.id, name:userExist.name, email:userExist.email, token:token})
    }
}
export {AuthAdmServices}