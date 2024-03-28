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
const shop_1 = __importDefault(require("../middleware/shop"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const shopschema = zod_1.z.string();
const passwordschema = zod_1.z.string().min(6);
const productNameschema = zod_1.z.string();
const productPriceschema = zod_1.z.number().positive();
//shop signin route
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopName, password } = req.body;
    try {
        shopschema.parse(shopName);
        passwordschema.parse(password);
        const existingShop = yield prisma.shop.findUnique({
            where: {
                shopName: shopName,
                password: password
            }
        });
        if (!existingShop) {
            const newShop = yield prisma.shop.create({
                data: {
                    shopName: shopName,
                    password: password
                }
            });
            console.log(newShop);
            res.status(201).json({ msg: "new shop created", shop: newShop });
        }
        else {
            res.status(200).json({ msg: "shop already exists", shop: existingShop });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
//add product
router.post("/products", shop_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productPrice } = req.body;
    try {
        // Validate product name and price using schemas
        productNameschema.parse(productName);
        productPriceschema.parse(productPrice);
        // Check if req.shop is set
        if (!req.shop) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const shop = req.shop;
        // Retrieve the shop from the database to ensure it exists
        const availableShop = yield prisma.shop.findUnique({
            where: {
                shopName: shop.shopName,
            }
        });
        if (!availableShop) {
            return res.status(401).json({ error: "Shop not found" });
        }
        // Create the product
        const addProducts = yield prisma.productsShop.create({
            data: {
                shopId: shop.id,
                productPrice: productPrice,
                productName: productName
            }
        });
        res.status(201).json(addProducts);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
//get all the products
router.get("/products", shop_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = req.shop;
    const getProducts = yield prisma.productsShop.findMany({
        where: {
            shopId: shop.id
        }
    });
    return res.status(201).json(getProducts);
}));
exports.default = router;
