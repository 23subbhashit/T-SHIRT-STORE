import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { cartEmpty } from "./helper/cartHelper";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

// Braintree Payment GateWay

const Payment = ({ products, reload = undefined, setReload = (f) => f }) => {

	console.log('PRODUCTS>>>>>>>>>>',products);

	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
	});
	const userId = isAuthenticated && isAuthenticated().user.id;
	const token = isAuthenticated && isAuthenticated().token;

	const getToken = (userId, token) => {
		getmeToken(userId, token).then((info) => {
			console.log('INFO>>>>>>>>>>',info);
			if (info?.error) {
				setInfo({
					...info,
					error: info.error,
				});
				signout(() => {
					return <Navigate to="/" />;
				});
			} else {
				const clientToken = info.client;
				setInfo({ clientToken });
			}
		});
	};

	useEffect(() => {
		getToken(userId, token);
	}, []);

	const getAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + parseFloat(p.price);
		});
		return amount;
	};

	const onPurchase = () => {
		setInfo({loading: true})
		let nonce
        console.log("INFO INSTANCE",info.instance)
		let getNonce = info.instance?.requestPaymentMethod()
		.then(data => {
			nonce = data.nonce
			const paymentData  = {
				paymentMethodNonce: nonce,
				amount: getAmount()
			}
			processPayment(userId, token, paymentData)
			.then(response => {
				if (response.error) {
					if (response.code == '1') {
						alert("Payment Faild")
						signout(() => {
							return <Navigate to="/" />
						})
					}
				}else{
					setInfo({
						...info,
						success: response.success, loading: false
					})
					console.log("Payment Success")
					let product_names = ""
					products.forEach(function(item){
						console.log('ITEM>>>>>>>>>>',item);
						product_names += item.name + ", "
					});
					const orderData = {
						products: product_names,
						transaction_id: response.transaction.id,
						amount: response.transaction.amount
					}
					createOrder(userId, token, orderData)
					.then(response => {
                        console.log("Create Order PaymentB file,",response);
						if (response.error) {
							if (response.code == '1') {
								console.log("ORDER FAILD")
							}
							signout(() => {
								return <Navigate to="/" />
							})
						}else{
							if (response.success == true) {
								alert("Order Placed")
							}
						}
						
					})
					.catch(error => {
						setInfo({loading:false, success: false})
						console.log("order failed", error)
					})
					cartEmpty(() => {
						console.log("cart is empty")
					})
					setReload(!reload)
				}
				
			})
			.catch(e => console.log(e))
		})
		.catch(e => console.log("NONCE", e))
	}

	const showDropIn = () => {
        console.log("DROP IN INFO INSTANCE",info)
		return (
			<div>
				{info.clientToken !== null && products.length > 0 ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => {
                                console.log("INSTANCE IN ONINSTANCE",instance)
                                (info.instance = instance)
                            }
                                
                                }
						>
						</DropIn>
						<button onClick={onPurchase} className="btn btn-block btn-success">Place Order</button>
					</div>
				) : (
					<h3>Please Login First</h3>
				)}
			</div>
		);
	};

	return (
		<div>
			<h3>your total product amount is {getAmount()}</h3>
			{showDropIn()}
		</div>
	);
};

export default Payment;