import React, { Fragment, useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { isAuthenticated } from "../../actions/auth";
const breedOptions = [
    {text: "COW", value:"COW"},
    {text: "BUFFALOW",value:"BUFFALOW"},
    {text: "SHEEP", value:"SHEEP"}
]
const vaccineOptions = [
    {text: "CORONA",value: "COVID"},
    {text: "POLIO",value: "POLIO"}
]
const Vaccine = props => {
    const [breedName,setBreedName] = useState("");
    const [vaccineName,setVaccineName] = useState("");
    const [age, setAge] = useState("");
    return (
        <Fragment>
        <div style={{padding: '8px'}}>
        <Header>Vaccination</Header>
        <Form>
        <Form.Select 
        label="Breed"
        options={breedOptions}
        value={breedName}
        onChange={(e,{value}) => setBreedName(value)}
        placeholder="Select Breed"
        />
        <Form.Input 
        label="Age of Animal"
        type="Number"
        placeholder="Enter Age in Years"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        />
        <Form.Select 
        label="Vaccine"
        options={vaccineOptions}
        value={vaccineName}
        placeholder="Select Vaccine"
        onChange={(e,{value}) => setVaccineName(value)}
        />
        <Button>{isAuthenticated() ? "Book Vaccination": 'Login to Book'}</Button>
        </Form>
        </div>
        </Fragment>
    )
}
export default Vaccine