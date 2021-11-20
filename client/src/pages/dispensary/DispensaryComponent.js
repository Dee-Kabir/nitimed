import React, { Fragment } from "react";
import ShowLists from "../../components/tableComponents/ShowLists";
import { getDiagonstic, getDiagonsticByName } from "../../actions/queries";
import { Helmet } from "react-helmet";
import { webName } from "../../Config";

const DispensaryComponent = () => {
  
  return (
    <Fragment>
    <Helmet>
    <title>{webName} | Dispensaries</title>
    </Helmet>
    <ShowLists title="Dispensary" listName="Dispensary" what="dispensary" getDataName={getDiagonstic} dataName="dispensary" getDataByName={getDiagonsticByName} headerList={["#","district","state","Dispensary name","contact number"]}
    cellName= {["sNo","district","state","dispensaryName","contactNumber"]} inputLabel="state name or district name" tableHeading="List of veterinary dispensaries" placeholder="Enter district or state" fields={["state","district"]} />
    </Fragment>
    )
};
export default DispensaryComponent;

