import React, {Fragment} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {signout, isAuthenticated} from "../auth/helper/index"





 const Menu = ({path}) => {
  const navigate = useNavigate()
  let location = useLocation();
	const currentTab = (path) => {
    if (location.pathname===path) {
        return {color: '#2ecc72'}
    } else {
        return {color: '#ffffff'}
    }
 }
  return (
		<div>
			<ul className="nav nav-tabs bg-dark">
				<Link style={currentTab("/")} className="nav-link" to="/">
					Home
				</Link>
				
				{isAuthenticated() && (
					<li className="nav-item">
					<Link className="nav-link" to="/cart" style={currentTab("/cart")}>
						Cart
					</Link>
				</li>
				)}
				{isAuthenticated() && (
					<Fragment>
					<li className="nav-item">
					<Link className="nav-link" to="/user/dashboard" style={currentTab("/user/dashboard")}>
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
						<span
							className="nav-link text-warning"
							onClick={() => {
								signout(() => {
									navigate("/"); //updated
								});
							}}>				
							Signout
						</span>
					</li>
				</Fragment>
				)}
				{!isAuthenticated() && (
				<Fragment>
					<li className="nav-item">
							<Link className="nav-link" to="/signup" style={currentTab("/signup")}>
								Signup
							</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/signin" style={currentTab("/signin")}>
							Signin
						</Link>
					</li>
				</Fragment>
				)}
				
			</ul>
		</div>
	);
};

export default Menu;
