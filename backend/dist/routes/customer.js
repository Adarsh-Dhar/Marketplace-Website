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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const customer_1 = __importDefault(require("../middleware/customer"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const emailschema = zod_1.z.string().email();
const passwordschema = zod_1.z.string().min(6);
const productNameschema = zod_1.z.string();
const productPriceschema = zod_1.z.number().positive();
// Customer signin
router.post("/signin", async (req, res) =>  {
    const { email, password } = req.body;
    try {
        emailschema.parse(email);
        passwordschema.parse(password);
        const existingCustomer = yield prisma.customer.findUnique({
            where: {
                email: email,
                password: password
            }
        });
        if (!existingCustomer) {
            const newCustomer = yield prisma.customer.create({
                data: {
                    email: email,
                    password: password
                }
            });
            console.log(newCustomer);
            res.status(201).json({ msg: "new customer created", shop: newCustomer });
        }
        else {
            res.status(200).json({ msg: "customer already exists", shop: existingCustomer });
        }
    }
    catch (error) {
        console.error(error);
    }
});
// show all the product from a shop
router.post("/products", customer_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopName } = req.body;
    try {
        const customer = req.customer;
        const getShop = yield prisma.shop.findUnique({
            where: {
                shopName: shopName
            }
        });
        if (getShop == null) {
            res.status(401).json({ error: "No shop of this name is found" });
        }
        else {
            console.log(getShop.id);
            const getProducts = yield prisma.productsShop.findMany({
                where: {
                    shopId: getShop.id
                }
            });
            res.status(200).json(getProducts); // Changed status code to 200 for success
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
//post products in productCustomer
router.post("/cart", customer_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productPrice } = req.body;
    try {
        productNameschema.parse(productName);
        productPriceschema.parse(productPrice);
        const customer = req.customer;
        const postProducts = yield prisma.productsCustomer.create({
            data: {
                customerId: customer.id,
                productName: productName,
                productPrice: productPrice
            }
        });
        if (postProducts) {
            res.status(200).json(postProducts);
        }
        else {
            res.status(401).json({ error: "unable to buy product" });
        }
    }
    catch (error) {
        console.error("error in inserting data", error);
    }
}));
//show cart
router.get("/cart", customer_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = req.customer;
        const getProducts = yield prisma.productsCustomer.findMany({
            where: {
                customerId: customer.id
            }
        });
        res.status(201).json(getProducts);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
