"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jwtPassword = process.env.JWT_PASSWORD || "customer";
function customerMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.headers.email;
        const password = req.headers.password;
        try {
            // Find the customer in the database
            const findCustomer = yield prisma.customer.findUnique({
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
        }
        catch (error) {
            console.error('Error in authentication middleware:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
function signJwt(email, password) {
    const payload = { email, password };
    const token = jsonwebtoken_1.default.sign(payload, jwtPassword);
    return token;
}
function verifyJwt(token, jwtPassword) {
    try {
        jsonwebtoken_1.default.verify(token, jwtPassword);
        console.log("Password is verified");
        return true;
    }
    catch (error) {
        console.error("Error in JWT verification:", error);
        return false;
    }
}
exports.default = customerMiddleware;
