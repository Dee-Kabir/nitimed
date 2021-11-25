import { Component } from "react";
import {isAuthenticated} from "../../actions/auth"
import LoadingComponent from "../../utilities/LoadingComponent"
import firebase from "../../firebaseHelper";
import { Link } from "react-router-dom";
import { Header, Table } from "semantic-ui-react";
import TableHeader from "../tableComponents/TableHeader";
import { getUserAppointments } from "../../actions/firebaseapi";
import moment from "moment";
class AppointmentHistory extends Component {
    state = {appointments: [],
        loading: false,}
    componentDidMount(){
        
        this.loadAppointments()
    }
    loadAppointments = async () => {
        this.setState({loading:true})
        const token = localStorage.getItem('token')
        try{
            getUserAppointments(isAuthenticated(),token,this.props.category).then(data => {
                if(data.success)
                this.setState({appointments: data[this.props.category]})
                this.setState({loading:false})
            })
        }catch(err){
            console.log(err)
            this.setState({loading:false})
        }
        
    }
    
    render(){
        const {loading,appointments} = this.state
    return(!loading ? (appointments.length > 0 ?
        <div>
        <Header>Appointments</Header>
        <Table celled striped>
        <TableHeader headerParams={["#","Date","Doctor Name","Phone","Completed","Action"]} />
        <Table.Body>
        {
            appointments.map((app,_)=>(
                <Table.Row key={app.id+5+_} >
                <Table.Cell>{_+1}</Table.Cell>
                <Table.Cell>{moment(app.createdAt).format('DD/MM/YYYY')}</Table.Cell>
                <Table.Cell>{app.doctor.name}</Table.Cell>
                <Table.Cell>{app.doctor.phone}</Table.Cell>
                <Table.Cell>{app.completed ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{app.completed ? <Link to="/contact-us">Raise issue</Link> : <Link to={`/join-room?host=${false}&name=${this.props.userName}&doctorId=${(app.doctor.id)}&appointmentId=${app.id}&category=${this.props.category}`}>Video call</Link>}</Table.Cell>
                </Table.Row>
            ))
        }
        </Table.Body>
        </Table>
        </div> :<div>No appointment Yet</div>) : <LoadingComponent loading={loading} />
    )
    }
}
export default AppointmentHistory;