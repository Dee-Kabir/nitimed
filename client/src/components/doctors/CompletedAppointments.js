import { Component } from "react";
import { Header, Table } from "semantic-ui-react";
import LoadingComponent from "../../utilities/LoadingComponent";
import TableHeader from "../tableComponents/TableHeader";
import { getPendingAppointments } from "../../actions/firebaseapi";
import moment from "moment";
class CompletedAppointments extends Component {
  state = { appointments: [], loading: false, error: "" };
  componentDidMount() {
    this.loadAppointments();
  }
  loadAppointments = async () => {
    this.setState({ loading: true });
    const token = localStorage.getItem('token')
    try{
      getPendingAppointments(this.props.doctorId,token,this.props.category,this.props.status).then((data) => {
        if(data.success)
        this.setState({appointments: data.appointments[this.props.status]})
        else
        this.setState({error: data.message})
        this.setState({ loading: false })
      })
    }catch(err){
    this.setState({ loading: false });
    }
  };
  render() {
    const { loading, appointments } = this.state;
    return !loading ? (
      appointments.length > 0 ? (
        <div>
          <Header>{this.props.heading}</Header>
          <Table celled striped >
          <TableHeader headerParams={["#","Owner Name","Created on","Completed on"]} />
            <Table.Body>
              {appointments.map((app, _) => (
                <Table.Row key={app._id}>
                  <Table.Cell>{_ + 1}</Table.Cell>
                  <Table.Cell>{app.user.name}</Table.Cell>
                  <Table.Cell>
                    {app.createdAt && moment(app.createdAt).format('DD/MM/YYYY') }
                  </Table.Cell>
                  <Table.Cell>
                    {app.updatedAt &&
                      moment(app.updatedAt).format('DD/MM/YYYY')}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <Header>No {this.props.heading} Yet</Header>
      )
    ) : (
      <LoadingComponent loading={loading} />
    );
  }
}
export default CompletedAppointments;
