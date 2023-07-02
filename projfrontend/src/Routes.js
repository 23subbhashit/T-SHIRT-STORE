import React from 'react'
import { BrowserRouter , Routes , Route }  from 'react-router-dom'
import Home from './core/Home'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashboard from './user/UserDashboard'
import Cart from './core/Cart'
const Routesrenamed = () =>{
    return(
        <BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/cart" element={<Cart />} />
				<Route element={<PrivateRoutes />}>
					<Route path="/user/dashboard" exact element={<UserDashboard />} />
				</Route>
				{/*<Route path="user/dashboard" element= {<PrivateRoutes> <UserDashboard/> </PrivateRoutes>} />*/}
			</Routes>
		</BrowserRouter>
    )
}
export default Routesrenamed;