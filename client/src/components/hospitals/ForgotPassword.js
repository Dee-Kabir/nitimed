import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { getOtp } from "../../actions/email";
import ErrorComponent from '../../utilities/ErrorComponent'
const ForgotPassword = props => {
    const [email,setEmail] = useState('');
    const [values,setValues] = useState({
        loading: false,
        error: '',
        message: '',
    })
    const { loading, error, message} = values;
    const submitEmail = (e) => {
        e.preventDefault();
        if(email===''){
            setValues({...values,error: 'Enter email'});
            return;
        }
        setValues({...values,loading:true})
        try{
            getOtp(email).then(data => {
                if(data.success){
                    setValues({...values,message: data.message,error: ''})
                }else{
                    setValues({...values,error: data.message,message: ''})
                }
            })
        }catch(err){
            console.log(err)
        }
        setValues({...values,loading:false})
    }
    
    const emailForm = () => (
        <div style={{padding: '16px',height:'70vh',marginTop:"71px"}}>
        <Header>Reset Password using email</Header>
        <Form loading={loading} onSubmit={submitEmail}>
        <Form.Input type="email" label="Email Address" name="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" disabled={loading} loading={loading}>Get Otp</Button>
        </Form>
        </div>
    )
    return(<Fragment>
        {error && <ErrorComponent error={error} />}
        {message && <Message info>{message}</Message>}
        {
            emailForm()
        }
        </Fragment>
    )
}
export default ForgotPassword