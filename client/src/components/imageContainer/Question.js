import { useState } from "react";
import classes from "./Questions.module.css";
const Question = ({ ques,sNo }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={classes.question_block}>
      <div onClick={() => setShow(!show)} className={classes.question}>
        {sNo}. {ques.question}
      </div>
      {show && <div className={classes.answer} dangerouslySetInnerHTML={{__html : ques.answer}}></div>}
    </div>
  );
};
export default Question;
