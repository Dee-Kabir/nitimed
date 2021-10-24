import React from "react";
import { connect } from "react-redux";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";

const VideoButtons = (props) => {
  const { room, connectOnlyWithAudio } = props;
  return (
    <div className="video_buttons_container">
      <MicButton room={room} />
      {!connectOnlyWithAudio && <CameraButton room={room} />}
      <LeaveRoomButton room={room} />
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.reducer,
  };
};

export default connect(mapStoreStateToProps)(VideoButtons);
