import { getDiagonstic, getDiagonsticByName } from "../../actions/queries";
import ShowLists from "../../components/tableComponents/ShowLists";
const DiseasesComponent = () => {
  return (
    <ShowLists title="Diseases" listName="Disease" what="diseases" getDataName={getDiagonstic} dataName="diseases" getDataByName={getDiagonsticByName} headerList={["#","Species Name","Disease Name","Disease Symptoms"]}
    cellName={["sNo","speciesName","diseaseName","diseaseSymptoms"]} inputLabel="Species name or Disease name" tableHeading="List of diseases found in animals" placeholder="Enter disease or species name" fields={["speciesName","diseaseName"]} />
  )
};
export default DiseasesComponent;
