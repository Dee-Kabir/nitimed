import moment from "moment";
import { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Input, Modal, Table,Icon } from "semantic-ui-react";
import { completeAppointments,getPendingAppointments } from "../../actions/firebaseapi";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
import TableHeader from "../tableComponents/TableHeader";
class PendingAppointments extends Component {
  state = { appointments: [], loading: false, error: "",open: false };
  componentDidMount() {
    this.loadAppointments();
  }
  loadAppointments = async () => {
    this.setState({ loading: true });
    const token = localStorage.getItem('token')
    try{
      getPendingAppointments(this.props.doctorId,token,this.props.category,this.props.status).then(data => {
        if(data.success)
        this.setState({appointments: [...data.appointments[this.props.status]]})
        else
        this.setState({error: data.message})
        this.setState({ loading: false });
      })
    }catch(err){
      console.log(err)
      this.setState({ loading: false });
    }
    
  };
  makeAppointmentDone = (id) => {
    const token = localStorage.getItem('token')
    this.setState({ loading: true });
    let remark = document.getElementById("remarkText").value;
    try{
      completeAppointments(id,true,remark,token,this.props.category).then((data) => {
        if(data.success){
          let newappoint = [];
          this.state.appointments.forEach((appointment) => {
            if (appointment._id !== id) newappoint.push(appointment);
          });
          this.setState({ appointments: newappoint});
        }else{
          this.setState({error: data.message})
        }
      })
    }catch(err){
      console.log(err)
    }
    this.setState({ loading: false });
  };
  render() {
    const { loading, appointments, error } = this.state;
    return !loading ? (
      appointments.length > 0 ? (
        <div>
          {error && <ErrorComponent error={error} />}
          <Header>{this.props.heading}</Header>
          <Table celled>
          <TableHeader headerParams={["#","Owner Name","created","Status","About animal","About Owner"]}/>
            <Table.Body>
              {appointments.map((app, _) => (
                <Table.Row key={app._id}>
                  <Table.Cell>{_ + 1}</Table.Cell>
                  <Table.Cell>{app.user && app.user.name}</Table.Cell>
                  <Table.Cell>
                    {app.createdAt && moment(app.createdAt).format("DD/MM/YYYY")}
                  </Table.Cell>
                  <Table.Cell>
                  <Modal closeIcon onOpen={() => this.setState({open: true})} onClose={() => this.setState({open:false})} open={this.state.open} size="small" trigger={
                    <Input
                    checked={this.state.open}
                    onChange={() =>{
                      this.setState({open: true})
                    }
                    }
                    type="checkbox"
                  />
                  } >
                  <Header><Icon name="edit" size="large"/> Remarks</Header>
                  <Modal.Content>
                    <p>
                      Enter details about the appointment
                    </p>
                    <textarea placeholder="Enter remark here" id="remarkText" style={{width: '95%', height: '300px'}} />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='red' onClick={() => this.setState({open: false})}>
                      <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' onClick={() => {this.setState({open: false})
                  this.makeAppointmentDone(app._id)
                  }
                  }>
                      <Icon name='checkmark' /> Done
                    </Button>
                  </Modal.Actions>
                  </Modal>
                    {" "}
                  </Table.Cell>
                  <Table.Cell style={{cursor: "pointer",color: "blue"}}><Link to={{
                    pathname: `/animal/${app.animal}`, state:{doctorId: this.props.doctorId}
                  }}>More</Link></Table.Cell>
                  <Table.Cell style={{cursor: "pointer",color: "blue"}}><Link to={`/app-info/${app._id}/${this.props.category}/${this.props.doctorId}`
                  }> Owner</Link></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          
        </div>
      ) : (
        <Header>No {this.props.heading}</Header>
      )
    ) : (
      <LoadingComponent loading={loading} />
    );
  }
}
export default withRouter(PendingAppointments);
