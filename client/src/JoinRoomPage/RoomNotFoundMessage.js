import React from "react";

const RoomNotFoundMessage = ({ showRoomNotFoundMessage }) => {
  return (
    <div className="room_not_found_container">
      {showRoomNotFoundMessage && (
        <p className="room_not_found_paragraph">
          Room has not been found or Doctor is not online. Please try again.
        </p>
      )}
    </div>
  );
};

export default RoomNotFoundMessage;
