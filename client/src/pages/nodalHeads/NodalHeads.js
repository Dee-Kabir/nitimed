import firebase from "../../firebaseHelper"
import { useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Form, Grid, Header, Table } from "semantic-ui-react";
import TableHeader from "../../components/tableComponents/TableHeader";

const NodalHeads = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    document.title="Nitimed | NodalHeads"
    loadNodalHeads();
  }, []);
  const loadNodalHeads = () =>{
    setLoading(true)
    firebase.database().ref("jsonfiles").child("nodal_Heads").orderByChild("/State ").once("value",(snap)=>{
      setdata(snap.val())
      setLoading(false)
    })
  }
  useEffect(()=>{
    if(searchterm){
      handleSearchMessages();
    }
  },[searchterm])
  const handleSearchChange = (event) => {
    setSearchterm(event.target.value)
  };
  const handleSearchMessages = () => {
    const nodal_heads_list = [...data];
    const regex = new RegExp(searchterm, "gi");
    const searchResults = nodal_heads_list.reduce((acc, message) => {
      if (
        (message["State "] && message["State "].match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setResult(searchResults)
   
  };
  const displayList = (data) => {
    return data && <Table celled striped >
    {data.length > 0 && (
      <TableHeader headerParams={["Sno.","State","Nodal Officer","Mobile no."]} />
    )}
    <Table.Body>
      {data.length > 0  ? (
        data.map((d,_) => (
          <Table.Row key={`${d["Mobile No"]}${_}`}>
          <Table.Cell >{_+1}</Table.Cell>
            <Table.Cell>{d["State "]}</Table.Cell>
            <Table.Cell>{d["Name of Nodal Officer"]}</Table.Cell>
            <Table.Cell>{d["Mobile No"]}</Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell>No Nodal Head Present</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
  }
  return (!loading ? data &&
    <Grid className="m-4">
    <Grid.Row>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="State Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter State" />
    </Grid.Row>
    <Grid.Row>
    <Header>List of Nodal Heads</Header>
    </Grid.Row>
   <Grid.Row>
      {
        searchterm ? displayList(result) : displayList(data)
      }
      </Grid.Row>
      </Grid> : <LoadingComponent loading={loading} />
  );
};
export default NodalHeads;