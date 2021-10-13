const Razorpay = require('razorpay')
const {v4 : uuidv4} = require('uuid')
var crypto = require("crypto");
var instance = new Razorpay({
    key_id: process.env.KEY_ID_RAZORPAY,
    key_secret: process.env.KEY_SECRET_RAZORPAY
  })
exports.createOrder = async(req,res) => {
    const {amount, currency} = req.body;
    const receipt = uuidv4()
    instance.orders.create({amount:amount*100, currency, receipt},(err,order)=>{
        if(err){
            return res.status(400).json({
                error: err 
            })
        }else{
            order.key_id = process.env.KEY_ID_RAZORPAY
            return res.json(order)   
        }
    })
}
exports.verifySignature = async(req,res) =>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body
    let body=razorpay_order_id + "|" + razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET_RAZORPAY).update(body.toString()).digest('hex');
    
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === razorpay_signature)
    response={"signatureIsValid":"true"}
    return res.json(response);
}
exports.capturePayments = async(req,res) => {
    const{amount,paymentId,currency} = req.body
     instance.payments.capture(paymentId,amount,currency).then((data)=>{
        
        return res.json(data)
    })
}