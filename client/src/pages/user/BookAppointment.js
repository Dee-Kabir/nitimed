import { useState,useEffect, Fragment } from "react"
import { isAuthenticated } from "../../actions/auth"
import ErrorComponent from "../../utilities/ErrorComponent"
import { createOrder } from "../../actions/payment"
import {verifySignature,capturePayments} from "../../actions/payment"
import { Divider } from "antd"
import { Button ,Input} from "semantic-ui-react"
import { bookAppointment } from "../../actions/firebaseapi"
import { connect } from "react-redux"
import ShowAnimals from "../../components/animals/ShowAnimals"
const loadRazorpay = async(data) => {
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      
      script.onload = () => {
          resolve(true)
      }
      script.onerror = () => {
          resolve(false)
      }
      document.body.appendChild(script)
    })
}

const BookAppointment = (props) => {
    const [text,setText] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const [selectedAnimal,setSelectedAnimal] = useState("");
    useEffect(() => {
        document.title="Nitimed | Book Appointment"
        if(props.selectedDoc === ""){
            props.history.goBack()
        }
       
        // window.onbeforeunload = handleBeforeUnload
      }, [props.selectedDoc]);
    //   const handleBeforeUnload = (e) => {
    //     e.preventDefault();
    //     const message =
    //       "Are you sure you want to leave? All provided data will be lost.";
    //     e.returnValue = message;
    //     return '';
    //   };
      const bookAppointmentWithDoctor = async(payment_id,order_id,razorpay_signature,amount) =>{
        setLoading(true)
        const doctorId = props.match.params.doctorId
        const token = localStorage.getItem('token')
        // const animalId = props.state.params
        bookAppointment({amount,doctorId,userId: isAuthenticated(),order_id,payment_id,razorpay_signature,animal:selectedAnimal},token).then(data => {
            if(data.success){
                alert('Appointment Booked check your Appointment History on your dashboard')
                props.history.replace(`/dashboard/${isAuthenticated()}?show=appointmentHistory`)
            }else{
                setError("No token available for today")
            }
        })
      }
    const displayRazorpay = async(data) => {
        const res = await loadRazorpay()
        if(!res){
            alert("Internet connection error.")
            return
        }
        const userInfo = props.user
        const options = {
            "key": `${data.key_id}`, // Enter the Key ID generated from the Dashboard
            "amount": `${(data.amount)*100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "NitiMed",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": `${data.id}`, //This is a sample Order ID. Pass the `id` obtained in the previous step
            "handler": function (response){
                verifySignature(data.id,response.razorpay_payment_id,response.razorpay_signature).then((verified)=>{
                    if(verified.signatureIsValid === "true"){
                        capturePayments(response.razorpay_payment_id,data.amount,"INR").then((capturesData)=>{
                            if(capturesData.captured)
                            bookAppointmentWithDoctor(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature,data.amount)
                            else{
                                setError("If amount deducted from your account it will be returned within 5 days.Please try again.")
                            }
                        }).catch(err => {
                            setError(err)
                        })
                    }
                    else{
                        setError("Appointment not Booked.")
                        setError("If amount deducted from your account it will be returned within 5 days.Please try again.")
                    }
                })
               
            },
            "prefill": {
                "name": userInfo.name,
                "contact": userInfo.phone
            },
            
        };
        var paymentObject = new window.Razorpay(options);
        paymentObject.open()
        paymentObject.on('payment.failed', function (response){
            setError(response.error.description + "reason: "+response.error.reason)
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            if(text ==="Book" && selectedAnimal!==""){
                setLoading(true)
                if(props.selectedDoc.jobType === "private" && props.selectedDoc.fee != 0){
                    // alert("You will be redirected to payment gateway")
                    //     createOrder({amount: props.selectedDoc.fee,currency: 'INR'}).then(data => {
                    //         if(data && data.error){
                    //             setError("Internet Connection error")
                    //         }
                    //         else{
                    //             displayRazorpay(data)
                    //         }
                    //     }).catch(err => setError(err))
                    alert("Fees should be payed directly to the doctor.")
                }
                bookAppointmentWithDoctor()
                setLoading(false)
            }else{
                setError("Enter the text correctly and select Animal for which treatment is needed.")
            }
        }catch(err){
            setError("Please select the doctor Again")
        }
    }
    const handleSelection = (id) => {
        if(selectedAnimal===id){
            setSelectedAnimal("")
        }else{
            setSelectedAnimal(id);
        }
    }
    return (<Fragment>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop: '16px',marginTop:"71px"}}>
        {error && <ErrorComponent error={error} />}
        <div style={{border: '4px solid #551D8B', borderRadius: '8px',padding:'8px'}} >
            <h2 style={{textAlign:'center'}}>Booking Details</h2>
            <Divider />
            <div style={{fontSize:'16px'}}><span style={{fontWeight:'600'}}>Doctor</span>- Dr.{props.selectedDoc.name}</div>  
            <div style={{fontSize:'16px'}}><span style={{fontWeight:'600'}}>Fee</span>- Rs {props.selectedDoc.fee}</div>
            <Divider/>
            <div style={{fontWeight: '600',textAlign: 'center'}}>write Book in the below box<br/> <span>and</span><br/>Select one of your animal for which you need assistance.</div>
            <form onSubmit={handleSubmit} style={{display: 'flex' ,justifyContent: 'space-between'}}>
            <Input type="text" value={text} style={{flex: "1"}} onChange={(e)=> {setText(e.target.value)
            setError("")
            }} />
            <Button disabled={loading} type="submit" onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
        </div>
        <ShowAnimals userId={props.user.id} booking={'true'} selected={selectedAnimal} onSelect={handleSelection}/>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    selectedDoc : state.doctor.selectedDoctor,
    user : state.user.user
})
export default connect(mapStateToProps)(BookAppointment);