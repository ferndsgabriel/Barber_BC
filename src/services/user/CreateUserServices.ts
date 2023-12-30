import { hash } from 'bcryptjs';
import { prisma } from '../../prisma';

interface CreateUserProps {
    name: string;
    email: string;
    photo: string;
    sub:string
}

class CreateUserServices {
    async execute({ name, email, photo, sub }: CreateUserProps) {

        if (!email || !name || !photo || !sub) {
        throw new Error('Digite todos os campos.');
        }

        const existUser = await prisma.user.findFirst({
            where:{
                sub:sub
            }
        });

        if (existUser){
            throw new Error('Usuário já está associado a outra conta.')
        }

        const existEmail = await prisma.user.findFirst({
            where:{
                email:email
            }
        });

        if (existEmail){
            throw new Error('Este endereço de e-mail já está associado a outra conta.')
        }

        if (name.length < 3) {
        throw new Error('Nome inválido');
        }

        const hashSub = await hash(sub, 8); 

        const createUser = await prisma.user.create({
            data:{
                name,
                sub:hashSub,
                photo,
                email
            },select:{
                name:true,
                email:true,
                photo:true,
                id:true
            }
        })

        return createUser;

    }
}

export { CreateUserServices };
