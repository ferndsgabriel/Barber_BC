import { hash, compare } from 'bcryptjs';
import { prisma } from '../../prisma';
import { FormatName } from '../../ultis/format';

interface CreateUserProps {
    name: string;
    lastname:string;
    email: string;
    pass:string,
    cod: string,
    main:boolean,
    status:boolean
}

class CreateAdmServices {
    async execute({ name, email, pass, cod, lastname, main, status}: CreateUserProps) {

        if (!email || !name  || !pass || !lastname || main === undefined || main === null) {
        throw new Error('Digite todos os campos.');
        }

        const emailNoSpace = email.trim();
        const lowerEmail = emailNoSpace.toLowerCase();

        const existEmail = await prisma.adm.findFirst({
            where:{
                email:lowerEmail
            }
        });

        if (existEmail){
            throw new Error('Este endereço de e-mail já está associado a outra conta.')
        }

        const codAdm = await compare (cod, process.env.ADMCREATE_SECRET);

        if (!codAdm && main){
            throw new Error ('Código inválido');
        }
        
        if (name.length < 3) {
        throw new Error('Nome inválido');
        }

        if (lastname.length < 3) {
            throw new Error('Nome inválido');
            }

        const hashPass= await hash(pass, 8); 
        
        const formatName = FormatName(name);
        const formatLastname = FormatName(lastname);

        const newStatus = main === true ? main : undefined

        const createUser = await prisma.adm.create({
            data:{
                name:`${formatName} ${formatLastname}`,
                pass:hashPass,
                email:lowerEmail,
                main:main,
                status:newStatus
            },select:{
                name:true,
                email:true,
                id:true,
                main:true,
                status:true,
            }
        })

        return createUser;

    }
}

export { CreateAdmServices };
