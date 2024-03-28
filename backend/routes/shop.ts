import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import shopMiddleware from "../middleware/shop";
import {z} from "zod"

const prisma = new PrismaClient();
const router = Router();

// Define the CustomRequest interface to extend Request
interface CustomRequest extends Request {
    shop?: any; // Define the type of customerData here
}
const shopschema = z.string()
const passwordschema = z.string().min(6)

const productNameschema = z.string()
const productPriceschema = z.number().positive()


//shop signin route
router.post("/signin", async (req: Request, res: Response) => {
    const { shopName, password } = req.body;
    
    try {
        shopschema.parse(shopName)
        passwordschema.parse(password)
        const existingShop = await prisma.shop.findUnique({
            where : {
                shopName : shopName,
                password : password
            }
        })

        if(!existingShop){
            const newShop = await prisma.shop.create({
                data: {
                    shopName: shopName,
                    password: password
                }
            });
            console.log(newShop)
            res.status(201).json({msg : "new shop created", shop : newShop});
        }else{
            res.status(200).json({msg : "shop already exists" , shop : existingShop})
        }
        
            
        
        
    } catch (error) {
        console.error(error)
    }
});




//add product
router.post("/products", shopMiddleware, async (req: CustomRequest, res: Response) => {
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
        const availableShop = await prisma.shop.findUnique({
            where: {
                shopName: shop.shopName,
                
            }
        });

        if (!availableShop) {
            return res.status(401).json({ error: "Shop not found" });
        }

        // Create the product
        const addProducts = await prisma.productsShop.create({
            data: {
                shopId: shop.id,
                productPrice: productPrice,
                productName: productName
            }
        });

        res.status(201).json(addProducts);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//get all the products
router.get("/products",shopMiddleware , async(req : CustomRequest,res: Response) => {
    const shop = req.shop
   const getProducts = await prisma.productsShop.findMany({
    where : {
        shopId : shop.id
    }
    
   })
   return res.status(201).json(getProducts)
})


export default router
