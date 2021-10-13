const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_IDENTITY: "SET_IDENTITY",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_TWILIO_ACCESS_TOKEN: "SET_TWILIO_ACCESS_TOKEN",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  SET_MESSAGES: "SET_MESSAGES",
  SET_SELECTED_DOCTOR: "SET_SELECTED_DOCTOR",
  SET_USER_LOGGED_IN : "SET_USER_LOGGED_IN",
  SET_USER_MOBILE_NUMBER: "SET_USER_MOBILE_NUMBER",
};

export const setIdentity = (identity) => {
  return {
    type: Actions.SET_IDENTITY,
    identity,
  };
};

export const setIsRoomHost = (isRoomHost) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    isRoomHost,
  };
};

export const setConnectOnlyWithAudio = (onlyWithAudio) => {
  return {
    type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
    onlyWithAudio,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: Actions.SET_ROOM_ID,
    roomId,
  };
};

export const setTwilioAccessToken = (token) => {
  return {
    type: Actions.SET_TWILIO_ACCESS_TOKEN,
    token,
  };
};

export const setShowOverlay = (showOverlay) => {
  return {
    type: Actions.SET_SHOW_OVERLAY,
    showOverlay,
  };
};

export const setParticipants = (participants) => {
  return {
    type: Actions.SET_PARTICIPANTS,
    participants,
  };
};

export const setMessages = (messages) => {
  return {
    type: Actions.SET_MESSAGES,
    messages,
  };
};
export const setSelectedDoctor = (doctor) => {
  return {
    type: Actions.SET_SELECTED_DOCTOR,
    doctor
  }
}
export const setUserLoggedIn = (user) => {
  return {
    type: Actions.SET_USER_LOGGED_IN,
    user
  }
}
export const setUserMobileNumber = (mobileNumber) => {
  return{
    type: Actions.SET_USER_MOBILE_NUMBER,
    mobileNumber
  }
}

export default Actions;
