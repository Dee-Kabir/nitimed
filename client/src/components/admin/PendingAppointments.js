import React, { useEffect, useState } from "react";
import { loadPendingAppointments } from "../../actions/admin";
import {Button, Table} from "semantic-ui-react"
import TableHeader from "../tableComponents/TableHeader"
const PendingAppointments = (props) => {
    const [doctors, setDoctors] = useState([])
    const loadDoctors = () => {
        try{
            loadPendingAppointments(props.district).then((data) => {
                if(data.success){
                    setDoctors(data.doctors)
                }else{
                    props.setError(data.message)
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        loadDoctors()
    },[])
    const doctorComp = (doctors) => {
        return(
            doctors.map((doctor,_)=> (
                <Table.Row key={doctor.id}>
                <Table.Cell>{_+1}</Table.Cell>
                <Table.Cell>{doctor.name}</Table.Cell>
                <Table.Cell>{doctor.phone}</Table.Cell>
                <Table.Cell><Button onClick={() => props.history.push(`/doctor-dashboard/${doctor.id}?show=appointments`)}>Show Doctor</Button></Table.Cell>
                </Table.Row>
            ))
        )
    }
    return(
        <div>
        <Table striped celled>
        <TableHeader headerParams={["#","Name","Phone","Action"]} />
        <Table.Body>
        {doctorComp(doctors)}
        </Table.Body>
        </Table>
        </div>
    )
} 
export default PendingAppointments