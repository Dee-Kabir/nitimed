import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { getOtp } from "../../actions/email";
import ErrorComponent from '../../utilities/ErrorComponent'
const ForgotPassword = props => {
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")
    const submitEmail = (e) => {
        e.preventDefault();
        if(email===''){
            setError("Enter Email")
            return;
        }
        setLoading(true)
        try{
            setMessage("");
            setError("")
            getOtp(email).then(data => {
                if(data.success){
                    setMessage(data.message + "also check spam folder.");
                }else{
                    setError(data.error)
                }
               setLoading(false)
            })
        }catch(err){
            console.log(err)
            setLoading(false)
        }
        
    }
    
    const emailForm = (
        <div style={{padding: '16px',height:'70vh',marginTop:"71px"}}>
        <Header>Reset Password using email</Header>
        {error && <ErrorComponent error={error} />}
        {message && <Message info>{message}</Message>}
        <Form loading={loading} onSubmit={submitEmail}>
        <Form.Input type="email" label="Email Address" name="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" disabled={loading} loading={loading}>Get Otp</Button>
        </Form>
        </div>
    )
    return(<Fragment>
        
        {
            emailForm
        }
        </Fragment>
    )
}
export default ForgotPassword