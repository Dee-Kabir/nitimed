import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Button,Form, Header } from "semantic-ui-react";
import { resetPass } from "../../actions/email";
import ErrorComponent from "../../utilities/ErrorComponent";

const ResetPassword = props => {
    const [password,setPassword] = useState('')
    const [values,setValues] = useState({
        loading: false,
        message: '',
        error: ''
    })
    const {loading,error,message} = values;
    const changePassword = (e) => {
        e.preventDefault()
        if(password.length < 10){
            setValues({...values,error: 'Password must be 10 characters long.'})
            return;
        }
        setValues({...values,loading:true})
        try{
            resetPass(props.match.params.token,props.match.params.id,password).then(data => {
                if(data.success){
                    setValues({...values,message: data.message,error: ''})
                    props.history.push('/hospital-auth')
                }else{
                    setValues({...values,error: data.message,message: ''})
                }
            })
        }catch(err){
            console.log(err)
        }
        setValues({...values,loading:false})
    }
    return(
        <Fragment>
        <div style={{marginTop: '71px'}}></div>
        {
            error && <ErrorComponent error={error} />
        }
        {
            message && <p>{message}</p>
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