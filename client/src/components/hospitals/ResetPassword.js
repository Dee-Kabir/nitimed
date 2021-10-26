import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Button,Form, Header, Message } from "semantic-ui-react";
import { resetPass } from "../../actions/email";
import ErrorComponent from "../../utilities/ErrorComponent";

const ResetPassword = props => {
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const changePassword = (e) => {
        e.preventDefault()
        if(password.length < 10){
            setError('Password must be 10 characters long.')
            return;
        }
        setLoading(true)
        setError("")
        setMessage("")
        try{
            resetPass(props.match.params.token,props.match.params.id,password).then(data => {
                if(data.success){
                    setMessage(data.message)
                    props.history.replace('/hospital-auth')
                }else{
                    setError(data.error)
                }
                setLoading(false)
            })
        }catch(err){
            setLoading(false)
            console.log(err)
        }
    }
    return(
        <Fragment>
        <div style={{marginTop: '71px'}}></div>
        {
            error && <ErrorComponent error={error} />
        }
        {
            message && <Message info>{message}</Message>
        }
        <div style={{padding: '16px',height: '80vh'}}>
        <Header>Reset Password</Header>
        <Form loading={loading} onSubmit={changePassword}>
        <Form.Input type="text" label="New password" focus  placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" disabled={loading} loading={loading}>Submit</Button>
        </Form>
        </div>
        </Fragment>
    )
}
export default ResetPassword;