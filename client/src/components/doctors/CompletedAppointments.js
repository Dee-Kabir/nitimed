import { Component } from "react";
import { Header, Table } from "semantic-ui-react";
import LoadingComponent from "../../utilities/LoadingComponent";
import TableHeader from "../tableComponents/TableHeader";
import { getCompletedAppointments } from "../../actions/firebaseapi";
class CompletedAppointments extends Component {
  state = { appointments: [], loading: false, error: "" };
  componentDidMount() {
    this.loadAppointments();
  }
  loadAppointments = async () => {
    this.setState({ loading: true });
    const token = localStorage.getItem('token')
    getCompletedAppointments(this.props.doctorId,token).then((data) => {
      if(data.success)
      this.setState({appointments: data.appointments.completedAppointments})
      else
      this.setState({error: data.message})
    })
    this.setState({ loading: false });
  };
  render() {
    const { loading, appointments } = this.state;
    return !loading ? (
      appointments.length > 0 ? (
        <div>
          <Header>Completed Appointmets</Header>
          <Table celled striped >
          <TableHeader headerParams={["Sno.","Patient Name","Created on","Completed on"]} />
            <Table.Body>
              {appointments.map((app, _) => (
                <Table.Row key={app.id}>
                  <Table.Cell>{_ + 1}</Table.Cell>
                  <Table.Cell>{app.user.name}</Table.Cell>
                  <Table.Cell>
                    {app.createdAt && app.createdAt.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {app.updatedAt &&
                      app.updatedAt.toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <Header>No appointment Completed Yet</Header>
      )
    ) : (
      <LoadingComponent loading={loading} />
    );
  }
}
export default CompletedAppointments;
