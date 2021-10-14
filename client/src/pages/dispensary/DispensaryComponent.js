import firebase from "../../firebaseHelper"
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Form, Table, Grid, GridRow,Header} from "semantic-ui-react";
import TableHeader from "../../components/tableComponents/TableHeader";
const DispensaryComponent = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    document.title = "Nitimed | Dispensaries"
    loadDispensaries();
  }, []);
  const loadDispensaries = () =>{
    setLoading(true)
    try{
        firebase.firestore().collection("dispensary").get().then(data => {
          let dilist=[];
          data.forEach(di => dilist.push({...di.data(),id: di.id}));
          setdata(dilist);
          setLoading(false)
        })
    }catch(err){
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
        (message["districtName "] && message["districtName "].match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setResult(searchResults)
  };
  const tableHeader = () =>(<TableHeader headerParams={["Sno.","District","State","Dispensary Name","Contact no."]} />) 
  const tableDataRow = (d,_) =>(
    <Table.Row key={d.id}>
    <Table.Cell >{_+1}</Table.Cell>
    <Table.Cell >{d["districtName "]}</Table.Cell>
    <Table.Cell >GUJARAT</Table.Cell>
    <Table.Cell>{d["dispensaryName"]}</Table.Cell>
  <Table.Cell >{d["contactNumber"]}</Table.Cell>
    </Table.Row>
  )
  const noData = () => (
    <Table.Body>
        <Table.Row>
          <Table.Cell>No Dispensary Present</Table.Cell>
        </Table.Row>
        </Table.Body>
  )
  const displayList = (data) => {
    return ( data && <Table celled>
    {data.length > 0 ? (
      <Fragment>
      {tableHeader()}
    <Table.Body>
      {
        data.map((d,_) => (
          tableDataRow(d,_)
        ))}
        </Table.Body>
      </Fragment>
      ) : (
        noData()
      )}
  </Table>
    )
  }
  return (!loading ? data && 
    <Grid className="m-4">
    <GridRow stretched>
    <Form.Input style={{width: '50%',marginLeft:"16px"}} label="District Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter state name" />
    </GridRow>
    <Grid.Row>
    <Header>List of Dispensaries</Header>
      {
        searchterm ? displayList(result) : displayList(data)
      }
      </Grid.Row>
      </Grid> : <LoadingComponent loading={loading} />
  );
};
export default DispensaryComponent;