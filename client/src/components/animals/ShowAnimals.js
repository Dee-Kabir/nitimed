import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Header,Table } from "semantic-ui-react";
import { fetchAnimals } from "../../actions/animalApi";
import LoadingComponent from "../../utilities/LoadingComponent";
import TableHeader from "../tableComponents/TableHeader";
const ShowAnimals = props => {
    const [animals, setAnimals] = useState([])
    const [loading,setLoading] = useState(true)
    const loadAnimals = () => {
        const token = localStorage.getItem('token')
        try{
            fetchAnimals(props.userId,token).then(data => {
                if(data.success){
                    setAnimals(data.animals)
                }
                setLoading(false)
            })
        }catch(err){
            setLoading(false)
        }
    }
    useEffect(()=>{
        loadAnimals()
    },[])
    return (!loading ? ( animals && animals.length > 0 ?
        <div style={{padding: '16px'}}>
        <Header>Registered Animals</Header>
        <Table celled striped>
        <TableHeader headerParams={["Sno.","Breed","Name","Registration number","Age","Gender",props.booking ? "Select" :"More"]} />
        <Table.Body>
        {
            animals.map((app,_)=>(
                <Table.Row key={app.id+5+_} >
                <Table.Cell>{_+1}</Table.Cell>
                <Table.Cell>{app.breed}</Table.Cell>
                <Table.Cell>{app.name ? app.name : "NAN"}</Table.Cell>
                <Table.Cell>{app.registrationId ? app.registrationId : 'NAN'}</Table.Cell>
                <Table.Cell>{app.age}</Table.Cell>
                <Table.Cell>{app.gender}</Table.Cell>
                <Table.Cell>{props.booking==='true'? <Checkbox checked={props.selected===app.id} onChange={()=>{props.onSelect(app.id)}} /> :<Link to={`/animal/${app.id}`}>Actions</Link>}</Table.Cell>
                </Table.Row>
            ))
        }
        </Table.Body>
        </Table>
        </div> :<div>No Animal registered yet <Link to={`/dashboard/${props.userId}?show=addAnimals`}>Register now</Link> </div>) : <LoadingComponent loading={loading} />
    )
}
export default ShowAnimals