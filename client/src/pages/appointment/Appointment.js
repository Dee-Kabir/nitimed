import { Descriptions } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import {getAppointment} from "../../actions/firebaseapi"
import { webName } from "../../Config";
import MessageSection from "../../RoomPage/MessageSection/MessageSection";
const Appointment = props => {
    const [appointment,setAppointment] = useState('')
    const search = useLocation().search;
    useEffect(()=>{
        loadAppointment()
    },[])
    const loadAppointment = () => {
        const token = localStorage.getItem('token')
        try{
            const category =  props.match.params.category
            const appointmentId = props.match.params.appointmentId
            getAppointment(appointmentId,token,category).then((data)=>{
                if(data.success){
                    setAppointment(data.appointment.user)
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    return (appointment &&
        <Fragment>
        <Helmet>
        <title>{webName} | Dashboard</title>
        </Helmet>
        <div>
        <Descriptions column={2} bordered title="Information about the Owner" style={{marginBottom:"16px"}}>
            <Descriptions.Item label="Owner Name">{appointment.name}</Descriptions.Item>
            <Descriptions.Item label="Owner mobile number">{appointment.phone}</Descriptions.Item>
            <Descriptions.Item label="Owner address">{appointment.address}</Descriptions.Item>
            <Descriptions.Item label="State">{appointment.state}</Descriptions.Item>
            <Descriptions.Item label="District">{appointment.city}</Descriptions.Item>
            <Descriptions.Item label="Email">{appointment.email}</Descriptions.Item>
        </Descriptions>
        <MessageSection userId={props.match.params.doctorId} typeOfUser="Doctor" appointmentId={props.match.params.appointmentId} category={props.match.params.category}  />
        </div>
        </Fragment>
    )
}
export default Appointment;