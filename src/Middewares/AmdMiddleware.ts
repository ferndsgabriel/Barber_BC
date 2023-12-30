// middleware.ts
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { compare } from "bcryptjs"; 
import { prisma } from "../prisma";

interface Payload {
    sub: string; 
}

export async function AmdMiddleware(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    
    if (!authToken) {
        return res.status(401).end();
    }

    const [bearer, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.AJWT_SECRET) as Payload;
        const tokensInDatabase = await prisma.token.findMany({
            where: {
                adm_id: sub,
            },
        });

        if (!tokensInDatabase || tokensInDatabase.length === 0) {
            return res.status(401).end();
        }
        
        const validTokenExists = tokensInDatabase.some(async (value) => {
            return await compare(token, value.id);
        });

        if (!validTokenExists) {
            return res.status(401).end();
        }

        req.adm_id = sub; 
        return next();
        
    } catch (err) {
        return res.status(401).end();
    }
}
