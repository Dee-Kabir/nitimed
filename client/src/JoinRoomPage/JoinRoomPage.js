import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../actions/auth";
import MessageSection from "../RoomPage/MessageSection/MessageSection";
import { setIsRoomHost } from "../store/actions";
import JoinRoomContent from "./JoinRoomContent";
import "./JoinRoomPage.css";
import JoinRoomTitle from "./JoinRoomTitle";
import LoadingOverlay from "./LoadingOverlay";

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props;
  const [name, setName] = useState("")
  const [userId, setUserId] = useState("")
  const [appointmentId, setAppointmentId] = useState("");
  const [category, setCategory] = useState("");
  const search = useLocation().search;
  useEffect(()=>{
    const hostName = new URLSearchParams(search).get("name");
    setName(hostName)
    
  },[search])
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost==="true" || isRoomHost===true) {
      const userId = new URLSearchParams(search).get("userId");
      setUserId(userId);
      setIsRoomHostAction(true);
    }else{
      const doctorId = new URLSearchParams(search).get("doctorId")
      setUserId(doctorId);
      setIsRoomHostAction(false);
    }
  }, [search, setIsRoomHostAction]);

  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  useEffect(()=>{
    const appointmentId = new URLSearchParams(search).get("appointmentId");
    setAppointmentId(appointmentId)
    const category = new URLSearchParams(search).get("category");
    setCategory(category)
  },[])
  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay} name={name} userId={userId} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
      {((isRoomHost==="false" || isRoomHost===false) && appointmentId!=="" && userId!=="" && category!=="") ? <MessageSection userId={isAuthenticated()} typeOfUser= 'User' appointmentId={appointmentId} category={category} />: null}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomPage);
