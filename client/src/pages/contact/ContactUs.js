import { useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Divider, Form, Header, Message } from "semantic-ui-react";
import { sendEmail } from "../../actions/email";
import { webName } from "../../Config";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";

const ContactUs = (props) => {
    const [from , setFrom] = useState("")
    const [body, setBody] = useState("")
    const [error, setError] = useState("")
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState("");
    const handleChange = (e) => {
        if(e.target.name==="from"){
            setFrom(e.target.value)
        }else{
            setBody(e.target.value)
        }
        if(error)
        setError("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage("")
        setError("")
        if(from && body.length > 100){
            setLoading(true)
            try{
                sendEmail(from,body).then((data)=> {
                    if(data.error){
                        setError(data.error)
                        
                    }else{
                        setMessage(data.message)
                        setBody("")
                        setFrom("")
                    }
                    setLoading(false)
                })
            }catch(err){
                setError("Please try again after some time.")
                setLoading(false)
            }
        }else{
            setError("Email is required and Message should be at least 100 char long.")
        }
    }
    return(!loading ? 
        <Container style={{marginTop: "85px"}}>
        <Helmet>
        <title>{webName} | Contact us</title>
        </Helmet>
        {error && <ErrorComponent error={error}/>}
        {message && <Message info content={message}/>}
        <Header>Contact Us</Header>
        <Form>
        <Form.Input label="From" type="text" name="from" value={from} onChange={handleChange} required />
        <Form.TextArea label="Message" type="text" name="body" value={body} onChange={handleChange} required />
        <Form.Button type="submit" onClick={handleSubmit}>Send</Form.Button>
        </Form>
        <Divider />
        <b style={{fontSize: '18px'}}>Niti Aayog</b>
        <p>
        <b>Address: </b>Sansad Marg, Sansad Marg Area, New Delhi, Delhi 110001
        </p>
        <p>
        <b>Hours:</b> Open ⋅ Closes 6PM   
        </p>
        <p>
        <b>Phone:</b> 011 2309 6622
        </p>
        </Container> : <LoadingComponent />
    )
}
export default ContactUs;