import { Fragment, useEffect, useState } from "react";
import { Table, TableBody,Grid, Header,Button, Input, Message } from "semantic-ui-react";
import TableHeader from "./TableHeader";
import { webName } from "../../Config";
import LoadingComponent from "../../utilities/LoadingComponent";
const ShowLists = (props) => {
  const [data, setdata] = useState([]);
  const [loading,setLoading] = useState(false);
  const [from,setFrom] = useState(0);
  const [result,setResult] = useState([])
  const [searchterm,setSearchterm] = useState("");
  useEffect(() => {
    document.title= webName + " | " + props.title
  }, []);
  useEffect(()=>{
    loadData();
  },[from])
  const loadData = () =>{
    setLoading(true)
    try{
        props.getDataName(props.listName,props.what,from).then(data => {
          if(data.success){
            setdata(data[`${props.dataName}`])
          }else{
            setdata([])
          }
          setLoading(false)
        })
        
    }catch{
        setLoading(false)
        setdata([])
    }
  }
  const handleSearchChange = (event) => {
    setSearchterm(event.target.value)
    setResult([])
  };
  const handleSearchMessages = () => {
   try{
    props.getDataByName(props.listName,props.what,props.fields,searchterm).then(data=>{
      if(data.success){
        setResult(data[`${props.dataName}`])
      }else{
        setResult([])
      }
    })
   }catch(err){
    setResult([])
   }
  };
  const DiseaseTableHeader = () => <TableHeader headerParams={props.headerList} />

  const DiseaseTableBodyRow = (d) => (
    <Table.Row  key={d._id}>
    {
        props.cellName.map((cName)=>(
            <Table.Cell key={cName}>{d[`${cName}`]}</Table.Cell>
        ))
    }
    </Table.Row>
  )
  const NoData = () => (
    <Message content="No result found" />
  )
  
  const displayList = (data) => {
    return( data.length>0 ? <Table celled striped>
    {DiseaseTableHeader()}
      {<TableBody>
        {data.map((d,_) => (
            DiseaseTableBodyRow(d,_)
          ))}
      </TableBody>}
  </Table> : NoData()
    )
  }
  const controlButtons = (data) => (
    <Grid>
    <Grid.Row columns={2} stretched className="m-4">
      <Grid.Column ><Button disabled={data[0] && data[0]["sNo"] === 1} secondary onClick={() => setFrom(from-100)} >Previous</Button></Grid.Column>
      <Grid.Column ><Button disabled={data.length<99} positive onClick={() => setFrom(from+100)} >Next</Button></Grid.Column>
  </Grid.Row>
    </Grid>
  )
  return (!loading ? 
    <div style={{marginTop: "79px"}}>
      <div style={{display: 'flex',flexDirection:"column"}}>
        <div style={{display:"flex",width:"100%",alignItems:"center"}}>
          <div style={{width:"70%",display:"flex",alignItems:"center"}}>
            <label style={{marginRight: "20px"}}>{props.inputLabel}</label>
            <Input name="searchTerm" value={searchterm} onChange={handleSearchChange} type="text" placeholder={props.placeholder} />      
          </div>
          <Button primary content="Find" onClick={handleSearchMessages} />
        </div>
        <div style={{width:"100%",padding:"8px",marginTop:"32px"}}>
          <Header>{props.tableHeading}</Header>
          {searchterm.length > 0 ? displayList(result) : displayList(data)}
        </div>
        <div>
          {searchterm.length === 0 ? controlButtons(data): null}
        </div>
      </div>
    </div> : <LoadingComponent loading={loading} />
  )
};
export default ShowLists;
