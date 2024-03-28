import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { customerpasswordatom, emailatom } from "../store/atoms/customerSignin";

export default function ShopSignin() {
    const email = useRecoilValue(emailatom);
    const setEmail = useSetRecoilState(emailatom);
    const password = useRecoilValue(customerpasswordatom);
    const setPassword = useSetRecoilState(customerpasswordatom);

    const navigate = useNavigate();

   

    const handleClick = async () => {
        try {
            const Response = await axios.post("https://marketplace-website-6.onrender.com/customer/signin", {
                email: email,
                password: password
            });
            console.log(Response);
            navigate("/HomeCustomer");
        } catch (error) {
            console.error(error);
        }
    };

  
    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="bg-gray-700 shadow-md rounded-md p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Sign in as customer</h3>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-gray-300 text-white bg-gray-800 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleClick}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Sign in
            </button>
          </div>
        </div>
      );
}
