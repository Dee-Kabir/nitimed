import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Table } from "semantic-ui-react";
import { findDoctorByNameAndCity } from "../../actions/admin";
import { findDoctorByName } from "../../actions/firebaseapi";
import TableHeader from "../tableComponents/TableHeader"
const DoctorsList = (props) => {
    const [doctors, setDoctors] = useState([])
    const [result, setResult] = useState([]);
    const [searchterm, setSearchterm] = useState("")
    const loadDoctorList = () => {
        try{
            findDoctorByName(props.district, "city").then(data => {
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
        loadDoctorList()
    },[]);
    const searchDoctor = () => {
        let name = document.getElementById("doctorName").value
        try{
            findDoctorByNameAndCity(props.district,name).then(data => {
                if(data.success){
                    setResult(data.doctors)
                }else{
                    setResult([])
                    props.setError(data.message)
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    const doctorsComp = (doctors) =>{
        return(
            doctors.map((doctor,_)=> (
                <Table.Row key={doctor.id}>
                <Table.Cell>{_+1}</Table.Cell>
                <Table.Cell>{doctor.name}</Table.Cell>
                <Table.Cell>{doctor.city}</Table.Cell>
                <Table.Cell>{doctor.phone}</Table.Cell>
                </Table.Row>
            ))
        )
    }
    return(
        <div>
        <Grid className="m-4">
        <Grid.Row >
        <Grid.Column width={12} stretched><Input value={searchterm} onChange={(e)=> {setSearchterm(e.target.value)
        setResult([])
        }} label="Doctor name" id="doctorName" /></Grid.Column>
        <Grid.Column width={4}><Button onClick={()=> searchDoctor()}>Find</Button></Grid.Column>
        </Grid.Row>
        </Grid>
        <Table celled striped>
        <TableHeader headerParams={["#","Name","District","Phone"]} />
        <Table.Body>
        {searchterm.length > 0 ? doctorsComp(result) : doctorsComp(doctors)}
        </Table.Body>
        </Table> 
        </div>
    )
}
export default DoctorsList;