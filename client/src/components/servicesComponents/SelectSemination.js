import React, { Fragment, useEffect, useState } from "react";
import {Button, Form} from 'semantic-ui-react'
import { seminationCompleted,fetchValidIds } from "../../actions/animalApi";
import ErrorComponent from "../../utilities/ErrorComponent"

const SelectSemination = props => {
    const [ids, setIds] = useState([])
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")
    const [maleId, setMaleId] = useState("");
    const handleInsemination = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        if(maleId!=""){
            try{
                setLoading(true)
                seminationCompleted(props.animalId,maleId,token,props.doctorId).then(data => {
                    if(data.success){
                        alert(data.message)
                        props.loadAnimal()
                    }else{
                        setError(data.message)
                    }
                    setLoading(false)
                })
            }catch(err){
                setLoading(false)
                setError("Try again after sometime.")
            }
        }else{
            setError("Male animal unique id is required.")
        }
    }
    const loadValidIds = () => {
        const token = localStorage.getItem('token');
        let animalArr=[];
        try{

            fetchValidIds(props.animalBreed,token).then((data)=>{
                if(data.success){
                    data && data.animals.map((d) => animalArr.push({key: d.id,text: `id: ${d.id}, name: ${d.name}`,value: d.id}))
                    setError("")
                }else{
                    
                    setError(data.message)
                }
                setIds(animalArr)
                setLoading(false)
            })
        }catch(err){
            setError("Unable to fetch valid male animal id.")
        }
    }
    useEffect(()=>{
         
        props.animalBreed && loadValidIds(props.animalBreed)
    },[props.animalBreed])
    return(
        <Fragment>
        {error && <ErrorComponent error={error} /> }
        <Form onSubmit={handleInsemination} loading={loading}>
        <Form.Select
        search
        label="Male animal unique id"
        name="insemination"
        onChange={(e,{value,id}) => setMaleId(value)}
        placeholder="Slect Unique id"
        options={ids}
        />
        <Button type="submit">Submit</Button>
        </Form>
        </Fragment>
    )
}
export default SelectSemination;