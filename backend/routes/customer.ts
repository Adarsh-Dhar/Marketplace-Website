import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import customerMiddleware from "../middleware/customer";
import {number, z} from "zod"

const prisma = new PrismaClient();
const router = Router();

// Define the CustomRequest interface to extend Request
interface CustomRequest extends Request {
    customer?: any; // Define the type of customerData here
}

const emailschema = z.string().email()
const passwordschema = z.string().min(6)
const productNameschema = z.string()
const productPriceschema = z.number().positive()

// Customer signin
router.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
        emailschema.parse(email)
        passwordschema.parse(password)
        const existingCustomer = await prisma.customer.findUnique({
            where : {
                email : email,
                password : password
            }
        })

        if(!existingCustomer){
            const newCustomer = await prisma.customer.create({
                data: {
                    email : email,
                    password: password
                }
            });
            console.log(newCustomer)
            res.status(201).json({msg : "new customer created", shop : newCustomer});
        }else{
            res.status(200).json({msg : "customer already exists" , shop : existingCustomer})
        }
        
            
        
        
    } catch (error) {
        console.error(error)
    }
});

// show all the product from a shop
router.post("/products", customerMiddleware, async (req: CustomRequest, res: Response) => {
    const { shopName } = req.body;
    try {
        const customer = req.customer;
        interface Shop {
            id: number;
            shopName: string;
            password: string;
        }
        const getShop: Shop | null = await prisma.shop.findUnique({
            where: {
                shopName: shopName
            }
        });
        if (getShop == null) {
            res.status(401).json({ error: "No shop of this name is found" });
        } else {
            console.log(getShop.id);
            const getProducts = await prisma.productsShop.findMany({
                where: {
                    shopId: getShop.id
                }
            });
            res.status(200).json(getProducts); // Changed status code to 200 for success
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//post products in productCustomer
router.post("/cart",customerMiddleware,async(req: CustomRequest,res : Response)=> {
    const {productName , productPrice} = req.body
    try{
        productNameschema.parse(productName)
        productPriceschema.parse(productPrice)
        const customer = req.customer
        const postProducts = await prisma.productsCustomer.create({
            data : {
                customerId : customer.id,
                productName : productName,
                productPrice : productPrice
            }
          
        })
        if(postProducts){
                res.status(200).json(postProducts)
        }else{
            res.status(401).json({error : "unable to buy product"})
        }
    }catch(error){
        console.error("error in inserting data",error)
    }
})

//show cart
router.get("/cart",customerMiddleware,async(req: CustomRequest,res : Response)=>{
    try{
        const customer = req.customer
        const getProducts = await prisma.productsCustomer.findMany({
            where : {
                customerId : customer.id
            }
        })
        res.status(201).json(getProducts)
    }catch(error){
        console.error(error)
    }
})




export default router
