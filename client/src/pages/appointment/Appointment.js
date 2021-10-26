import { Descriptions } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import {getAppointment} from "../../actions/firebaseapi"
const Appointment = props => {
    const [appointment,setAppointment] = useState('')
    useEffect(()=>{
        loadAppointment()
    },[])
    const loadAppointment = () => {
        const token = localStorage.getItem('token')
        try{
            getAppointment(props.match.params.id,token).then((data)=>{
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
        <div style={{marginTop: "71px"}}>
        <Descriptions column={2} bordered title="Information about the Owner">
            <Descriptions.Item label="Owner Name">{appointment.name}</Descriptions.Item>
            <Descriptions.Item label="Owner mobile number">{appointment.phone}</Descriptions.Item>
            <Descriptions.Item label="Owner address">{appointment.address}</Descriptions.Item>
            <Descriptions.Item label="State">{appointment.state}</Descriptions.Item>
            <Descriptions.Item label="District">{appointment.city}</Descriptions.Item>
            <Descriptions.Item label="Email">{appointment.email}</Descriptions.Item>
        </Descriptions>
        </div>
        </Fragment>
    )
}
export default Appointment;