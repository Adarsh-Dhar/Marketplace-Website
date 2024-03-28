import { useNavigate} from "react-router-dom"
import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { shopatom, shoppasswordatom } from "../store/atoms/shopSignin"
import { cn } from "../components/utils/cn";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";


export default function ShopSignin() {
    const shop = useRecoilValue(shopatom)
    const setShop = useSetRecoilState(shopatom)
    const password = useRecoilValue(shoppasswordatom)
    const setPassword = useSetRecoilState(shoppasswordatom)

    const navigate = useNavigate()

  

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:5000/shop/signin", {
                shopName: shop,
                password: password
            })
            console.log(response)
            navigate("/HomeShop", { state: { shopName: shop } }) // Passing shopName in state to HomeShop
        } catch (error) {
            console.error(error)
        }
    }

  

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-700 shadow-md rounded-md p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Sign in as shop....</h3>
            <input type="text" placeholder="Enter shop name" value={shop} onChange={(e) => setShop(e.target.value)} className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"/>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"/>
            <button
              onClick={handleClick}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Sign in
            </button>
            </div>
            
        </div>
    )
}
