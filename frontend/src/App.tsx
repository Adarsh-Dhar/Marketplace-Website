
import './App.css'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import React, { Suspense } from 'react'
import { RecoilRoot } from 'recoil'

const Landing = React.lazy(() => import('./pages/Landing'))
const CustomerSignin = React.lazy(() => import('./pages/CustomerSignin'))
const ShopSignin = React.lazy(() => import('./pages/ShopSignin'))
const HomeCustomer = React.lazy(() => import('./pages/HomeCustomer'))
const HomeShop = React.lazy(() => import('./pages/HomeShop'))
const AllProducts = React.lazy(() => import('./pages/AllProducts'))
const Cart = React.lazy(() => import('./pages/Cart'))
const PayWithCrypto = React.lazy(() => import('./pages/PayWithCrypto'))
const PayWithQR = React.lazy(() => import('./pages/PayWithQR'))


import { useNavigate } from 'react-router-dom'


function App() {
  return (

    <RecoilRoot>
    
    <div>
      
       <BrowserRouter>
       <Header />
       <Routes>
       <Route path="/" element={<Suspense fallback={"Loading..."}><Landing /></Suspense>} /> {/* Set Landing page as the default route */}
       <Route path="/CustomerSignin" element={<Suspense fallback={"Loading..."}><CustomerSignin />
       </Suspense>} /> 

       <Route path="/ShopSignin" element={<Suspense fallback={"Loading..."}><ShopSignin />
       </Suspense>} /> 
       <Route path="/HomeCustomer" element={<Suspense fallback={"Loading..."}><HomeCustomer />
       </Suspense>} /> 

       <Route path="/HomeShop" element={<Suspense fallback={"Loading..."}><HomeShop />
       </Suspense>} /> 

       <Route path="/Cart" element={<Suspense fallback={"Loading..."}><Cart />
       </Suspense>} /> 

       <Route path="/AllProducts" element={<Suspense fallback={"Loading..."}><AllProducts />
       </Suspense>} /> 

       <Route path="/PayWithCrypto" element={<Suspense fallback={"Loading..."}><PayWithCrypto />
       </Suspense>} /> 

       <Route path="/PayWithQR" element={<Suspense fallback={"Loading..."}><PayWithQR />
       </Suspense>} /> 


       </Routes>
       </BrowserRouter>
       </div>
    </RecoilRoot>
  )
}

function Header(){
  const navigate = useNavigate()

  return(
    <div className='bg-gray-500'>
  <div className='flex justify-end'>
    <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300">Contacts</button>
    <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300">About</button>
    <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300" onClick={() => navigate("/Cart")}>Cart</button>
  </div>
</div>
  )
}

export default App
