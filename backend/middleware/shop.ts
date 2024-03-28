import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtPassword = process.env.JWT_PASSWORD || "shop";

interface CustomRequest extends Request {
    shop?: any;
}

async function shopMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const shopName: string = req.headers.shop as string;
    const password: string = req.headers.password as string;

    console.log(shopName)
    console.log(password)

    
        const findShop = await prisma.shop.findUnique({
            where: {
                shopName : shopName,
                password : password
            }
        });

        if (!findShop) {
            return res.status(401).json({ error: "Couldn't find the shop" });
        }

        // Generate and verify JWT token
        const token = signJwt(shopName, password);
        if (!token) {
            return res.status(401).json({ error: "Invalid shop or password" });
        }

        const verified = verifyJwt(token, jwtPassword);
        if (!verified) {
            return res.status(401).json({ error: "Invalid token" });
        }

        console.log(findShop)

        req.shop = findShop;

        next(); // Call next middleware
    
}

function signJwt(shopName: string, password: string): string | null {
    

    const payload = { shopName, password };
    const token = jwt.sign(payload, jwtPassword);
    return token;
}

function verifyJwt(token: string, jwtPassword: string): boolean {
    try {
        jwt.verify(token, jwtPassword);
        console.log("Password is verified");
        return true;
    } catch (error) {
        console.error("Error in JWT verification:", error);
        return false;
    }
}

export default shopMiddleware;
