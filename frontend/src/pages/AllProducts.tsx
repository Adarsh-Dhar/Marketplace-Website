import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { shopatom, shoppasswordatom } from "../store/atoms/shopSignin";

interface Product {
    productName: string;
    productPrice: number;
    // Add more properties if needed
}

export default function AllProducts() {
    const shopName = useRecoilValue(shopatom);
    const password = useRecoilValue(shoppasswordatom);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get<Product[]>("http://localhost:5000/shop/products", {
                    headers: {
                        shop: shopName,
                        password: password
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, [shopName, password]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">

      
        <div>
            <h1 className="text-3xl text-gray-400">All Products</h1>
            <ul className="list-disc">
                {products.map((product, index) => (
                    <li key={index}>
                        <p className="text-2xl text-center text-gray-400">{product.productName}</p>
                        <p className="text-2xl text-gray-400 text-center">{product.productPrice}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}
