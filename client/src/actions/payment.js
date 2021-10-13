import firebase from "../firebaseHelper"
import { isAuthenticated } from "./auth"
import {API_URL} from '../Config'
export const createOrder = async(paymentData) => {
    return await fetch(`${API_URL}/razorpay/order`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const storeOrderId = async(orderId) => {
    return firebase.firestore().collection("users").doc(`${isAuthenticated()}`).update({
        orderId : orderId
    })
}
export const verifySignature = async(orderId,payment_id,razorpay_signature) => {
    return await fetch(`${API_URL}/razorpay/payment/verify`,{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({razorpay_order_id:orderId,razorpay_payment_id:payment_id,razorpay_signature:razorpay_signature})
    }).then(res => res.json())
    .catch(err => console.log(err))
}
export const capturePayments = async(paymentId,amount,currency) => {
    return await fetch(`${API_URL}/razorpay/payment/capture`,{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            amount: parseInt(amount),
            currency: currency,
            paymentId: paymentId
        })
    }).then(res => res.json())
    .catch(err => console.log(err))
}