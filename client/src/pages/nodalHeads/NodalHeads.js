import { useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import { Form, Grid, Header, Table } from "semantic-ui-react";
import TableHeader from "../../components/tableComponents/TableHeader";
import { getNodalHeads } from "../../actions/queries";
import { Helmet } from "react-helmet";
import { webName } from "../../Config";

const NodalHeads = () => {
  const [data, setdata] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("")
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    loadNodalHeads();
  }, []);
  const loadNodalHeads = () =>{
    setLoading(true)
    try{
      getNodalHeads().then(data => {
        if(data.success){
          setdata(data.nodalHeads)
        }else{
          setdata([])
        }
        setLoading(false)
      })
    }catch(err){
      setLoading(false)
      setdata([])
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
        (message["state"] && message["state"].match(regex))
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
      <TableHeader headerParams={["Sno.","State","Name of Nodal Officer","Designation","Landline","Mobile","Email Id"]} />
    )}
    <Table.Body>
      {data.length > 0  ? (
        data.map((d,_) => (
          <Table.Row key={d._id}>
          <Table.Cell >{_+1}</Table.Cell>
            <Table.Cell>{d["state"]}</Table.Cell>
            <Table.Cell>{d["name"]}</Table.Cell>
            <Table.Cell>{d["designation"]}</Table.Cell>
            <Table.Cell>{d["landline"]}</Table.Cell>
            <Table.Cell>{d["mobile"]}</Table.Cell>
            <Table.Cell>{d["email"]}</Table.Cell>
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
    <Grid className="m-2" style={{justifyContent: "center",padding: "8px"}}>
    <Helmet>
    <title>{webName} | Nodal heads</title>
    </Helmet>
    <Grid.Row>
    <Form.Input style={{width: '50%',marginLeft:"32px",padding: "8px"}} label="State Name" name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder="Enter State" />
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