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
        getAppointment(props.match.params.id,token).then((data)=>{
            if(data.success){
                setAppointment(data.appointment)
            }
        })
    }
    return (appointment &&
        <Fragment>
        <div style={{marginTop: "71px"}}>
        {JSON.stringify(appointment)}
        <Descriptions title="Information about the Appointment">
            <Descriptions.Item label="Animal registration Id">{appointment.animal.registrationId}</Descriptions.Item>
        </Descriptions>
        </div>
        </Fragment>
    )
}
export default Appointment;