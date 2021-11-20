import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { getDiagonstic, getDiagonsticByName } from "../../actions/queries";
import ShowLists from "../../components/tableComponents/ShowLists";
import { webName } from "../../Config";
const DiseasesComponent = () => {
  return (
    <Fragment>
    <Helmet>
    <title>{webName} | Diseases</title>
    </Helmet>
    <ShowLists title="Diseases" listName="Disease" what="diseases" getDataName={getDiagonstic} dataName="diseases" getDataByName={getDiagonsticByName} headerList={["#","Species Name","Disease Name","Disease Symptoms"]}
    cellName={["sNo","speciesName","diseaseName","diseaseSymptoms"]} inputLabel="Species name or Disease name" tableHeading="List of diseases found in animals" placeholder="Enter disease or species name" fields={["speciesName","diseaseName"]} />
    </Fragment>
    )
};
export default DiseasesComponent;
