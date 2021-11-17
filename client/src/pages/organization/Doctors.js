import { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { isAuthenticated } from "../../actions/auth";
import { getDoctorsOfHospital } from "../../actions/firebaseapi";
import TableHeader from "../../components/tableComponents/TableHeader";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent"
class Doctors extends Component{
  state = {
    error: "",
    loading: false,
    doctors: []
  }

  componentDidMount() {
    this.loadDoctors();
  };
  loadDoctors = async() => {
    try {
      this.setState({ error: "", loading: true });
      const token = localStorage.getItem('token')
      this.props.hospitalId && getDoctorsOfHospital(isAuthenticated(),token).then((data)=> {
        if(data.success){
          this.setState({doctors : data.doctors.doctors},() => {
            
          })
        }else{
          this.setState({error: "Unable to fetch!!"})
        }
        this.setState({loading: false})
      })
    } catch(err) {
      this.setState({ error: "Error while connecting" , loading: false });
    }
  };
  render(){
    const {loading,error,doctors} = this.state
  return (
    !loading ? 
      <div style={{ height: "100vh" }}>
        {error && <ErrorComponent error={error}/>}
          {doctors.length > 0
            ? <Table celled striped>
            <TableHeader headerParams={["Sno.","Doctor Name","Contact no.","Dashboard"]}/>
            <Table.Body>
            {doctors.map((doc, i) => (
              <Table.Row key={doc.id}>
              <Table.Cell>{i+1}</Table.Cell>
              <Table.Cell>{doc.name}</Table.Cell>
              <Table.Cell>{doc.phone}</Table.Cell>
              <Table.Cell><Button onClick={() => {this.props.history.push(`/doctor-dashboard/${doc.id}?show=info`)}}>Go to Dashboard</Button></Table.Cell>
              </Table.Row>
            ))}
            </Table.Body> 
            </Table>
            : <h1>No Doctor Found</h1>}
      </div>
    : <LoadingComponent loading={loading} />
  );
}
};
export default Doctors;
