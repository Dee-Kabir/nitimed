import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./RoomPage.css";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import { connect } from "react-redux";
import { setTwilioAccessToken } from "../store/actions";
import { getTokenFromTwilio } from "../utils/twilioUtils";
import Overlay from "./VideoSection/Overlay";
import { Helmet } from "react-helmet";
import { webName } from "../Config";

const RoomPage = (props) => {
  const { identity, roomId, setTwilioAccessTokenAction, showOverlay } = props;

  const history = useHistory();

  useEffect(() => {
    if (!identity || !roomId) {
      history.push("/");
    } else {
      getTokenFromTwilio(setTwilioAccessTokenAction, identity);
    }
  }, []);

  return (
    <div className="room_container">
    <Helmet>
    <title>{webName}</title>
    </Helmet>
      <ParticipantsSection />
      <VideoSection />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.reducer,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setTwilioAccessTokenAction: (token) =>
      dispatch(setTwilioAccessToken(token)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomPage);
