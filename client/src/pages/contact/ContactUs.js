import { useState } from "react";
import { Container, Divider, Form, Header } from "semantic-ui-react";
import { sendEmail } from "../../actions/email";
import ErrorComponent from "../../utilities/ErrorComponent";

const ContactUs = (props) => {
    const [from , setFrom] = useState("")
    const [body, setBody] = useState("")
    const [error, setError] = useState("")
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
        if(from && body.length > 100){
            sendEmail(from,body).then((data)=> {
                console.log(data)
                if(data.error){
                    setError("data.error")
                }else{
                    alert("Message sent Successfully")
                    setBody("")
                    setFrom("")
                }
            })
        }else{
            setError("Email is required and Message should be at least 100 char long.")
        }
    }
    return(
        <Container style={{marginTop: "85px"}}>
        {error && <ErrorComponent error={error}/>}
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
        </Container>
    )
}
export default ContactUs;