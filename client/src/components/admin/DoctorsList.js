import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Table } from "semantic-ui-react";
import { findDoctorByNameAndCity } from "../../actions/admin";
import { findDoctorByName } from "../../actions/firebaseapi";
import TableHeader from "../tableComponents/TableHeader"
const DoctorsList = (props) => {
    const [doctors, setDoctors] = useState([])
    const [result, setResult] = useState([]);
    const [from, setFrom] = useState(0);
    const [searchterm, setSearchterm] = useState("")
    const loadDoctorList = () => {
        try{
            findDoctorByName(props.district, "city",from).then(data => {
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
    },[from]);
    const searchDoctor = () => {
        let name = document.getElementById("doctorName").value
        try{
            setFrom(0);
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
                <Table.Cell>{from+_+1}</Table.Cell>
                <Table.Cell>{doctor.name}</Table.Cell>
                <Table.Cell>{doctor.city}</Table.Cell>
                <Table.Cell>{doctor.phone}</Table.Cell>
                </Table.Row>
            ))
        )
    }
    const controlButtons = (
        <Grid>
        <Grid.Row columns={2} stretched className="m-4">
          <Grid.Column ><Button disabled={from <= 0} secondary onClick={() => setFrom(from-50)} >Previous</Button></Grid.Column>
          <Grid.Column ><Button disabled={doctors.length<50} positive onClick={() => setFrom(from+50)} >Next</Button></Grid.Column>
      </Grid.Row>
        </Grid>
      )
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
        {searchterm.length === 0 ? controlButtons: null}
        </div>
    )
}
export default DoctorsList;