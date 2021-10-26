import { Component, Fragment } from "react"
import LoadingComponent from "../../utilities/LoadingComponent";
import DoctorCard from "./DoctorCard"
import { Button, Modal, Table } from "semantic-ui-react";
import { getDoctorsOfHospital } from "../../actions/firebaseapi";
class HospitalCard extends Component{
  state = {
    show : false,
    doctorsList : [],
    loading : false
  }
  showHospitalData = async() => {
    if(this.state.doctorsList.length === 0){
      this.setState({loading:true})
      try{
        getDoctorsOfHospital(this.props.hospital.id).then((data) => {
          if(data.success){
            this.setState({doctorsList: data.doctors.doctors})
          }
          this.setState({loading:false})
        })
      }catch(err){
        this.setState({loading:false})
      }
    }
      this.setState({show: !this.state.show})
    }
    doctors = () => (<DoctorCard doctors={this.state.doctorsList} heading={`Doctors in hospital ${this.props.hospital.name}`} />)
    
    render(){
      const {loading,show} = this.state;
      const {hospital} = this.props
    return(!loading ?
        <Fragment>
        <Table.Row>
        <Table.Cell>{this.props.sno}</Table.Cell>
        <Table.Cell>{hospital.name}</Table.Cell>
        <Table.Cell>{hospital.state}</Table.Cell>
        <Table.Cell>{hospital.city}</Table.Cell>
        <Table.Cell>{hospital.phone}</Table.Cell>
        <Table.Cell><Button onClick={this.showHospitalData}>Show Doctors</Button></Table.Cell>
        </Table.Row>
        <Modal closeIcon onClose={() => this.setState({show:false})} open={show}>
        <Modal.Content scrolling>
        {hospital && this.doctors()}
        </Modal.Content>
          
        </Modal>
    </Fragment> : <LoadingComponent />
    )
    }
}
export default HospitalCard