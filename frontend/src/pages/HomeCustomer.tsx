import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { customerpasswordatom, emailatom } from "../store/atoms/customerSignin";

interface Product {
    productName: string;
    productPrice: number;
}

export default function AllProducts() {
    const email = useRecoilValue(emailatom);
    const password = useRecoilValue(customerpasswordatom);
    const [shopName, setShopName] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = async () => {
        try {
            const response = await axios.post<Product[]>("https://marketplace-website-6.onrender.com/customer/products", { shopName }, {
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

   

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-700 shadow-md rounded-md p-6 w-80">
            <input type="text" placeholder="Enter the shop name" value={shopName} onChange={(e) => setShopName(e.target.value)} className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"></input>
            <button onClick={() => getProducts()} className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300">Show products</button>
            <ul>
                {products.map((product, index) => (
                    <BuyProducts key={index} name={product.productName} price={product.productPrice}/>
                ))}
            </ul>
            </div>
        </div>
    );
}

interface Buy {
    name: string;
    price: number;
    
}

function BuyProducts({ name, price}: Buy) {
    const email = useRecoilValue(emailatom)
    const password = useRecoilValue(customerpasswordatom)
    const [addedToCart, setAddedToCart] = useState(false);

    const handleBuyButtonClick = async (productName : string, productPrice : number) => {
        try {
            const response = await axios.post("https://marketplace-website-6.onrender.com/customer/cart",{productName,productPrice},{
                headers : {
                    email : email,
                    password : password
                }
            });
            console.log(response);
            console.log(email);
            console.log(password);
            setAddedToCart(true);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(email);
    console.log(password);
    
    return (
        <div>
            <ul className="list-disc">
            <li>
          <h1 className="text-2xl text-center">{name}</h1>
          <h2 className="text-2xl text-center">{price}</h2>
          <div className="flex justify-center">
            <button onClick={() => handleBuyButtonClick(name, price)} className=" bg-gray-500 h-auto w-auto text-white py-1 px-2 rounded-md hover:bg-gray-900 transition duration-300 text-center">
                {addedToCart ? 'Added to Cart' : 'Buy'}
            </button>
            </div>
            </li>
            </ul>
        </div>
    );
    
}
