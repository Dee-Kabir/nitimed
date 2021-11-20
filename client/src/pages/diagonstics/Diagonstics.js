import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { getDiagonstic, getDiagonsticByName } from "../../actions/queries";
import ShowLists from "../../components/tableComponents/ShowLists";
import { webName } from "../../Config";
const Diagonstics = () => {
  return (<Fragment>
    <Helmet>
    <title>{webName} | Diagonstics</title>
    </Helmet>
    <ShowLists listName="Diagonstic" what="diagonstic" title="Diagonsis" getDataName={getDiagonstic} dataName="diagonstic" getDataByName={getDiagonsticByName} headerList={["#","state","District","Center name","Contact number"]}
    cellName={["sNo","state","district","diagonsticCenter","contactNumber"]} inputLabel="State name or District Name" tableHeading="List of veterinary diagonstic centers" placeholder="Enter state or district" fields={["state","district"]}/>
    </Fragment>
    );
};
export default Diagonstics;

