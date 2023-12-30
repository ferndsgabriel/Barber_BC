import { prisma } from "../../prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserProps { 
    email: string;
    sub:string
}
class AuthUserServices{ 
    async execute({ email, sub }: AuthUserProps) {
        if (!email || !sub){
            throw new Error('Digite todos os campos.');
        }
        const userExist = await prisma.user.findFirst({
            where:{
                email:email
            },select:{
                sub:true,
                name:true,
                email:true,
                id:true,
                photo:true,
                
            }
        });

        if (!userExist){
            throw new Error ('Usuário não encontrado.');
        }

        const subCompare = await compare (sub, userExist.sub);

        if(!subCompare){
            throw new Error ('Usuário não encontrado.');
        }

        const token = sign({
            name:userExist.name,
            email:userExist.email
        },
        process.env.UJWT_SECRET,
        {
            subject:userExist.id,
            expiresIn:'30d'
        }
        );

        const hashToken = await hash(token, 8);

        const createTokendb = await prisma.token.create({
            data:{
                id:hashToken,
                user_id:userExist.id,
            }
        })

        return ({id: userExist.id, name:userExist.name, email:userExist.email,
        photo: userExist.photo, token:token})
    }
}
export {AuthUserServices}