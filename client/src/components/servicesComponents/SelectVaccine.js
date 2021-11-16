import React, { Fragment, useEffect, useState } from "react";
import {Button, Form} from 'semantic-ui-react'
import { suggestVaccine, getVaccines } from "../../actions/animalApi";
import { isAuthenticated } from "../../actions/auth";

const SelectVaccine = props => {
    const [vaccine,setVaccine] = useState("");
    const [loading,setLoading] = useState(false)
    const [vaccines,setVaccines] = useState([]);
    useEffect(()=>{
        let vaccArr=[];
        try{
            getVaccines().then(data => {
                data && data.vaccines.map((d) => vaccArr.push({key: d.id,text: d.diseaseName,value: d.id}))
            })
        }catch(err){
            console.log(err)
        }
        setVaccines(vaccArr);
    },[props.breed]);
    const handlebookVaccine = (e) => {
        e.preventDefault()
        if(vaccine===""){
            return;
        }
        const token = localStorage.getItem('token');
        try{
            setLoading(true);
            suggestVaccine(props.animalId,vaccine,token,props.doctorId).then(data=>{
                if(data.success){
                    alert("Vaccine suggested.");
                    props.loadAnimal()
                }
            })
        }catch(err){
            console.log(err);
        }
        setLoading(false)
    }
    return(
        <Fragment>
        <Form onSubmit={handlebookVaccine} loading={loading}>
        <Form.Select
        label="Select Vaccine"
        name="vaccine"
        onChange={(e,{value,id}) => setVaccine(value)}
        placeholder="Slect Vaccine"
        options={vaccines}
        />
        <Button type="submit">Book</Button>
        </Form>
        </Fragment>
    )
}
export default SelectVaccine;