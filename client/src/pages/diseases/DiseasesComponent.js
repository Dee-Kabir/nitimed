import firebase from "../../firebaseHelper"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Table, TableBody,Grid, Header,Button, Form } from "semantic-ui-react";
import TableHeader from "../../components/tableComponents/TableHeader";
const DiseasesComponent = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [from,setFrom] = useState(0);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    document.title="Nitimed | Diseases "
    loadDiseases();
  }, []);
  const loadDiseases = () =>{
    setLoading(true)
    try{
        firebase.database().ref("jsonfiles").child("diseases_data").orderByKey().once("value",(snap)=>{
            setdata(snap.val())
            setLoading(false)
          })
    }catch{
        setLoading(false)
        setdata("")
    }
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
        (message["Disease_Name"] && message["Disease_Name"].match(regex)) || (message["Species_Name"] && message["Species_Name"].match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setResult(searchResults)
   
  };
  const DiseaseTableHeader = () => <TableHeader headerParams={["Sno.","Species Name","Disease Name","Disease Symptoms"]} />
  const DiseaseTableBodyRow = (d,_) => (
    <Table.Row  key={`${d["Disease_Name"]}${_}`}>
    <Table.Cell>{_+1}</Table.Cell>
      <Table.Cell >{d["Species_Name"]}</Table.Cell>
      <Table.Cell >{d["Disease_Name"]}</Table.Cell>
      <Table.Cell >{d["DiseaseSymptoms"]}</Table.Cell>
    </Table.Row>
  )
  const NoData = () => (
    <Table.Body>
    <Table.Row>
      <Table.Cell>No data Present</Table.Cell>
    </Table.Row>
    </Table.Body>
  )
  
  const displayList = (data) => {
    return( data &&  <Table celled striped>
    {data.slice(from,from+99).length > 0 ?(
      <Fragment>
      {DiseaseTableHeader()}
      <TableBody>
        {data.slice(from,from+99).map((d,_) => (
            DiseaseTableBodyRow(d,_)
          ))}
      </TableBody>
      </Fragment>
      ) : (
        NoData()
      )}
  </Table>
    )
  }
  const controlButtons = (data) => (
    <Grid.Row columns={2} stretched className="m-4">
<Grid.Column ><Button secondary onClick={() => {from >= 100 ? setFrom(from - 100) : setFrom(0)}} >Previous</Button></Grid.Column>
<Grid.Column ><Button positive onClick={() => {from < (data.length-99)? setFrom(from + 100):setFrom(0)}} >Next</Button></Grid.Column>
</Grid.Row>
  )
  return (!loading ? 
    <Grid className="m-4">
    <Grid.Row stretched>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="Disease or Breed Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter breed or disease name" />
    </Grid.Row>
    <Grid.Row><Header>List of Diseases with Symptoms</Header>
    {searchterm.length > 0 ? displayList(result) : displayList(data)}
    </Grid.Row>
      {searchterm.length > 0 ? controlButtons(result):  controlButtons(data)}
    </Grid> : <LoadingComponent loading={loading} />
  )
};
export default DiseasesComponent;