import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
const LoadingComponent = () => (
    <Dimmer active style={{height: "100%"}}>
    <Loader size="huge" content={"Loading..."} />
  </Dimmer>
);
export default LoadingComponent;
