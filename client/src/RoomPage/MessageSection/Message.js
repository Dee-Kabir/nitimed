import React from "react";
import { Comment, Image } from "semantic-ui-react";
import moment from "moment";
import classes from "./Messages.module.css";
const isOwnMessage = (message, userId) => {
  return message.author === userId
    ? classes.message__self
    : classes.message__other;
};
const timeFromNow = (timestamp) => {
  return moment(timestamp).fromNow();
};
const Message = ({ message, userId }) => (
  <Comment>
    {/*<Comment.Avatar src={message.user.avatar} />*/}
    <Comment.Content className={isOwnMessage(message, userId)}>
        <Comment.Metadata>{timeFromNow(message.createdAt)}</Comment.Metadata>
        <Comment.Text>{message.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);
export default Message;
