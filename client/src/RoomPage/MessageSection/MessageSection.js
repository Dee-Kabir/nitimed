import React, { Fragment, useEffect, useState } from "react";
import Skeleton from './Skeleton'
import Message from './Message'
import ErrorComponent from "../../utilities/ErrorComponent";
import { getMessages,postMessage } from "../../actions/message";
import { Button } from "semantic-ui-react";
const MessageSection = (props) => {
    const [loading,setLoading] = useState(true);
    const [messages, setMessages] = useState([])
    const [text,setText] = useState("")
    const [error, setError] = useState("");
    const loadMessages = () => {
        try{
            const token = localStorage.getItem('token')
            console.log(props.appointmentId,props.category)
            getMessages(props.appointmentId,props.category,token).then((data) => {
                if(data.success){
                    setMessages(data.messages)
                }else{
                    setMessages([])
                    setError(data.message)
                }
                setLoading(false);
                setError("");
            })
        }catch(err){
            setError("Unable to fetch messages");
            setLoading(false)
        }
    }
    useEffect(()=>{
        
        loadMessages()
    },[])

    const displayMessagesSkeleton = (loading) => (
        loading ? (
            <Fragment>
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </Fragment>
          ) : null
    )
    const displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message
        key={message._id}
        message={message}
        userId={props.userId}
      />
    ));
    const sendMessage = () => {
        try{
            setLoading(true)
            const token = localStorage.getItem('token')
            postMessage(props.appointmentId,props.typeOfUser,text,props.userId,props.category,token).then(data => {
                if(data.success){
                    setMessages(data.messages)
                    setText("")
                }else{
                    setError(data.message)
                }
                setLoading(false)
            })
        }catch(err){
            setError("Unable to send message")
            setLoading(false);
        }
    }
    return(
        <div className="join_room_page_message_panel">
        <p className="join_room_title">Leave a message</p>
        <div className="join_room_inputs_container">
        <input
        name="message"
        value={text}
        className="join_room_input"
        placeholder="Enter text"
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
        </div>
      <div className="join_room_page_messages">
      {error && <ErrorComponent error={error} />}
      {displayMessagesSkeleton(loading)}
      {displayMessages(messages)}
      </div>
        </div>
    )
}
export default MessageSection