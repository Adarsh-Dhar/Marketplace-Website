import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { shopatom } from "../store/atoms/shopSignin";
import { productsatom, priceatom } from "../store/atoms/shopProducts";

export default function HomeShop() {
    const productName = useRecoilValue(productsatom);
    const setProductName = useSetRecoilState(productsatom);
    const productPrice = useRecoilValue(priceatom);
    const setProductPrice = useSetRecoilState(priceatom);
    const shopName = useRecoilValue(shopatom);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            // Convert productPrice to a number
            const price = parseFloat(productPrice);

            const response = await axios.post(
                "http://localhost:5000/shop/products",
                {
                    productName: productName,
                    productPrice: price // Send productPrice as a number
                },
                {
                    headers: {
                        shop: shopName
                    }
                }
            );
            console.log(response);
            alert(`product ${productName} with price ${productPrice} added to shop ${shopName}`)
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

   

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-700 shadow-md rounded-md p-6 w-80">
            <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
            ></input>
            <input
                type="number"
                placeholder="Enter the price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
            ></input>
             <div className="flex gap-1">
             <button onClick={handleClick} className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none mr-4">Enter product</button>
             <button onClick={() => navigate("/AllProducts")}  className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none">Show products</button>
        </div>
            
            </div>
        </div>
    );
}
