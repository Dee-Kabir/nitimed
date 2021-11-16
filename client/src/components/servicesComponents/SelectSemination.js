import React, { Fragment, useEffect, useState } from "react";
import {Button, Form} from 'semantic-ui-react'
import { seminationCompleted } from "../../actions/animalApi";
import { isAuthenticated } from "../../actions/auth";
import ErrorComponent from "../../utilities/ErrorComponent"

const SelectSemination = props => {
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")
    const handleInsemination = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        if(e.target[0].name==="semination" && e.target[0].value!==""){
            try{
                setLoading(true)
                seminationCompleted(props.animalId,e.target[0].value,token,props.doctorId).then(data => {
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
            setError("Bull unique id is required.")
        }
    }
    return(
        <Fragment>
        {error && <ErrorComponent error={error} /> }
        <Form onSubmit={handleInsemination} loading={loading}>
        <Form.Input
        label="Male animal unique id"
        name="semination"
        onChange= {() => error && setError("")}
        placeholder="Enter male animal unique id"
        />
        <Button type="submit">Submit</Button>
        </Form>
        </Fragment>
    )
}
export default SelectSemination;