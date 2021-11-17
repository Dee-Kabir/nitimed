import React, { useState } from "react";
import { Header,Form, Button} from "semantic-ui-react";
import { addAnimal } from "../../actions/animalApi";
import { isAuthenticated } from "../../actions/auth";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
const breedOptions = [
    {text: 'Cow',value: 'cow'},
    {text: 'Buffalo',value: 'buffalo'},
    {text: 'Goat',value: 'goat'},
    {text: 'Sheep', value: 'sheep'},
    {text: 'Pig', value: 'pig'},
    {text: 'Others', value: 'other'}
]
const genderOptions = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
  ]
const AddAnimal = props => {
    const [values, setValues] = useState({
        name: '',
        registrationId: '',
        age: '',
        breed: '',
        gender: ''
    })
    const {name,registrationId,age,breed,gender} = values;
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = e => {
        e.preventDefault()
        if(age && breed && gender){
            const token = localStorage.getItem('token')
            try{
                setLoading(true)
                addAnimal(values,isAuthenticated(),token).then(data => {
                    if(data.success){
                        alert(data.message)
                        setValues({...values,name: '',registrationId: '',age: '',breed: '',gender: ''})
                        setError('')
                    }else{
                        setError(data.message)
                    }
                    setLoading(false)
                })
            }catch(err){
                setError("Network Connection Error")
                setLoading(false)
            }
        }else{
            setError("Age, breed and gender are required.")
        }
        
    }
    const handleChange = e => {
        setValues({...values,[e.target.name]: e.target.value})
        setError('')
    }
    return( !loading ? 
        <div>
        {error && <ErrorComponent error={error} />}
        <Header>Register Your Animal</Header>
        <Form loading={loading} onSubmit={handleSubmit}>
        <Form.Input label="Name" 
        type="text" 
        name="name"
        placeholder="Enter Animal Name"
        value={name}
        onChange={handleChange}
        />
        <Form.Input label="Registration Id" 
        type="text" 
        name="registrationId"
        placeholder="Animal Registration Number"
        value={registrationId}
        onChange={handleChange}
        />
        <Form.Input label="Age in years" 
        type="number" 
        name="age"
        placeholder="Animal's age"
        value={age}
        onChange={handleChange}
        />
        <Form.Select
        label="Gender"
        name="gender"
        onChange={(e,{value}) => setValues({...values, 'gender': value})}
        placeholder="Slect Gender"
        options={genderOptions}
        />
        <Form.Select 
        label="Breed"
        value={breed}
        onChange={(e,{value}) => setValues({...values, 'breed': value})}
        placeholder="Select breed"
        options={breedOptions}
        />
        <Button type="submit">Submit</Button>
        </Form>
        </div> : <LoadingComponent />
    )
}
export default AddAnimal