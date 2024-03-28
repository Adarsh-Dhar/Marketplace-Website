import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtPassword = process.env.JWT_PASSWORD || "customer";

interface CustomRequest extends Request {
    customer?: any; // Define the type of customerData here
}

async function customerMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const email: string = req.headers.email as string;
    const password: string = req.headers.password as string;

    try {
        // Find the customer in the database
        const findCustomer = await prisma.customer.findUnique({
            where: {
                email: email,
                password: password
            }
        });

        // Check if customer exists
        if (!findCustomer) {
            return res.status(401).json({ error: "Couldn't find the customer" });
        }

        // Generate and verify JWT token
        const token = signJwt(email, password);
        if (!token) {
            return res.status(401).json({ error: "Invalid customer or password" });
        }

        const verified = verifyJwt(token, jwtPassword);
        if (!verified) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Attach customer data to request object
        req.customer = findCustomer;

        next(); // Call next middleware
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

function signJwt(email: string, password: string): string | null {
    

    const payload = { email, password };
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

export default customerMiddleware;
