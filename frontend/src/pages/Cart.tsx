import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { customerpasswordatom, emailatom } from "../store/atoms/customerSignin";
http://localhost:5000
interface Product {
    productName: string;
    productPrice: number;
    // Add more properties if needed
}

export default function Cart() {
    const email = useRecoilValue(emailatom)
    const password = useRecoilValue(customerpasswordatom)
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get<Product[]>("https://marketplace-website-6.onrender.com/customer/cart", {
                    headers: {
                        email: email,
                        password: password
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, [email, password]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">

      
        <div>
            <h1 className="text-3xl text-gray-400 text-center">All Products</h1>
            <ul className="list-disc">
                {products.map((product, index) => (
                    <li key={index}>
                        <p className="text-2xl text-center text-gray-400 text-center">{product.productName}</p>
                        <p className="text-2xl text-gray-400 text-center text-center">{product.productPrice}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}
