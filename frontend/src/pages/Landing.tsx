import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-900 h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl text-white font-bold mb-4">Welcome to Adarsh's MarketPlace website</h1>
        <h3 className="text-lg mb-6 text-white text-center">This is an e-commerce website supporting both consumers and providers</h3>
        <h2 className="text-xl font-semibold text-white mb-2">How do you want to sign in?</h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              navigate("/CustomerSignin");
            }}
            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none"
          >
            Customer
          </button>
          <button
            onClick={() => {
              navigate("/ShopSignin");
            }}
            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none"
          >
            Shop
          </button>
        </div>
      </div>
    </div>
  );
}
