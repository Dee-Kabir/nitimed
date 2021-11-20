import { Descriptions } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Header,Button,Form,Table, Input } from "semantic-ui-react";
import { bookVaccine, fetchAnimal, updateAnimalOwner } from "../../actions/animalApi";
import { isAuthenticated } from "../../actions/auth";
import SelectVaccine from "../../components/servicesComponents/SelectVaccine";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
import TableHeader from '../../components/tableComponents/TableHeader'
import moment from 'moment'
import { connect } from "react-redux";
import SelectSemination from "../../components/servicesComponents/SelectSemination";

const AnimalPage = props => {
    const [animal,setAnimal] = useState('');
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const loadAnimal = () => {
        try{
            const token = localStorage.getItem('token')
            setLoading(true)
            fetchAnimal(props.match.params.id,token).then(data => {
                if(data.success){
                    setAnimal({...data.animal})
                    setError('');
                }else{
                    setError(data.message);
                }
                setLoading(false);
            })
        }catch(err){
            setLoading(false);
            setError("Network connection error")
        }
     
    }
    const handleUpdateButton = (e) => {
        e.preventDefault()
        if(phone.length === 10){
            setLoading(true)
            const token = localStorage.getItem('token')
            try{
                updateAnimalOwner(animal.id,"+91"+phone,token).then(data => {
                    if(data.success){
                        alert(data.message)
                       
                        props.history.goBack()
                    }else{
                        
                        setError(data.message)
                    }
                    setLoading(false)
                })
            }catch(err){
                setLoading(false)
                console.log(err)
            }
        }else{
            setError("Enter a valid mobile Number of 10 digits")
        }
    }
    useEffect(()=>{
        loadAnimal();
    },[])
    const vaccineGiven = async(id) => {
        try{
            setLoading(true)
            const token = localStorage.getItem('token')
            bookVaccine(animal.id,id,token).then((data) => {
                if(data.success){
                    alert("vaccination done")
                    loadAnimal()
                }else{
                    setError(data.message)
                }
                setLoading(false)
            })
        }catch(err){
            setLoading(false);
            setError("Network connection error")
        }
    }
    return(!loading ? animal &&
        <div >
        {error && <ErrorComponent error={error} />}
        <div style={{padding : '8px 32px'}}>
            <Descriptions
            title="Information of Animal"
            bordered
            column={{ xxl: 3, xl: 2, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Unique Id">{animal.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{animal.name ? animal.name : "NAN"}</Descriptions.Item>
                <Descriptions.Item label="Registration Number">{animal.registrationId ? animal.registrationId : "NAN"}</Descriptions.Item>
                <Descriptions.Item label="Age">{animal.age} yrs</Descriptions.Item>
                <Descriptions.Item label="Breed">{animal.breed}</Descriptions.Item>
                <Descriptions.Item label="Gender">{animal.gender}</Descriptions.Item>
            </Descriptions>
            
            <br/>
            <Header>Suggested Vaccines Information</Header>
            {animal.vaccines.length > 0 ?  <Table celled striped>
            <TableHeader headerParams={["#","vaccine name","Suggested on","Dose and Age","Subsequent doses",props.userType!==0 ? "Given" : null]} />
            <Table.Body>
                {
                    animal.vaccines.filter(vacc => vacc.completed===false).map((vacc,_) =>(
                        <Table.Row key={vacc.createdAt}>
                        <Table.Cell>{_+1}</Table.Cell>
                        <Table.Cell>{vacc.onThis && vacc.onThis.diseaseName}</Table.Cell>
                        <Table.Cell>{moment(vacc.createdAt).fromNow()}</Table.Cell>
                        <Table.Cell>{vacc.onThis.ageAtFirstDose!="NA" ? vacc.onThis.ageAtFirstDose : "Not available" }</Table.Cell>
                        <Table.Cell>{vacc.onThis.subsequentDoseOrRemark}</Table.Cell>
                        {props.userType!==0 ? <Table.Cell><Input type="checkbox" onChange={() => vaccineGiven(vacc._id)} /></Table.Cell> : null}
                        </Table.Row>
                    )) 
                    
                }
                </Table.Body>
            </Table>: <div>No vaccines taken till now</div>}
            <br />
            <Header>Vaccination Information</Header>
            {animal.vaccines.length > 0 ?  <Table celled striped>
            <TableHeader headerParams={["#","vaccine name","Given on","Subsequent dose or Remark"]} />
            <Table.Body>
                {
                    animal.vaccines.filter(vacc => vacc.completed===true).map((vacc,_) =>(
                        <Table.Row key={vacc.createdAt}>
                        <Table.Cell>{_+1}</Table.Cell>
                        <Table.Cell>{vacc.onThis && vacc.onThis.diseaseName}</Table.Cell>
                        <Table.Cell>{moment(vacc.updatedAt).fromNow()}</Table.Cell>
                        <Table.Cell>{vacc.onThis && vacc.onThis.subsequentDoseOrRemark}</Table.Cell>
                        </Table.Row>
                    )) 
                }
                </Table.Body>
            </Table>: <div>No vaccines taken till now</div>}
            {props.userType!==0 && <Fragment><br/>
            <div>
            <Header>Suggest a vaccine for the animal</Header>
            <SelectVaccine loadAnimal={loadAnimal} doctorId={props.location.state.doctorId} animalId = {animal.id} />
            </div></Fragment>}
            <br />
            <Header>Artificial Insemination Information</Header>
            {animal.semination.length > 0 ?  <Table celled striped>
            <TableHeader headerParams={["#","animal id","Done on","age(in years)"]} />
            <Table.Body>
                {
                    animal.semination.map((vacc,_) =>(
                        <Table.Row key={vacc._id}>
                        <Table.Cell>{_+1}</Table.Cell>
                        <Table.Cell>{vacc.onThis && vacc.onThis._id}</Table.Cell>
                        <Table.Cell>{moment(vacc.updatedAt).fromNow()}</Table.Cell>
                        <Table.Cell>{vacc.onThis&& vacc.onThis.age}</Table.Cell>
                        </Table.Row>
                    )) 
                }
                </Table.Body>
            </Table>: <div>No vaccines taken till now</div>}
        <br />
        {props.userType!==0 && animal.gender==="F" && <Fragment><br/>
            <div>
            <Header>Artificial Insemination</Header>
            <SelectSemination loadAnimal={loadAnimal} doctorId={props.location.state.doctorId} animalBreed={animal.breed} animalId = {animal.id} />
            </div></Fragment>}
        <br />
        {animal.remarks && animal.remarks.length > 0 ?<Fragment><Header>Remarks </Header>
            <Table celled striped>
            <TableHeader headerParams={["#","remark"]} />
            <Table.Body>
            {
                animal.remarks.map((remark,_) => (
                    <Table.Row key={remark+_}>
                    <Table.Cell>{_+1}</Table.Cell>
                    <Table.Cell>{remark}</Table.Cell>
                    </Table.Row>
                ))
            }
            </Table.Body>
            </Table>
            </Fragment>
        :null}
        <br/>
            {animal.owner===isAuthenticated() && <div>
                <Header>Update owner information while selling your animal.</Header>
                <Form onSubmit={handleUpdateButton} loading={loading}>
                <Form.Input type="text" inline
                label="New Owner mobile Number"
                name="phone"
                placeholder="Enter Your 10 digit Mobile Number"
                pattern="[1-9]{1}[0-9]{9}" onChange={(e) => setPhone(e.target.value)} />
                <Button type="submit" onClick={handleUpdateButton}>Update</Button>
                </Form>
                </div>}
        </div>
        </div> : <LoadingComponent />
    )
}
const mapStateToProps = state => ({
    userType: state.user.user && state.user.user.isAdmin
})
export default connect(mapStateToProps)(AnimalPage)
// <Table.Cell><Link to={`/vaccination?id=${animal.id}&vaccName=${vacc.onThis && vacc.onThis.diseaseName}`}>Book</Link></Table.Cell>