import { useEffect, useState } from "react";
import { getFaqs } from "../../actions/queries";
import { webName } from "../../Config";
import Question from "./Question";
import classes from "./Questions.module.css";
const FaqContainer = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(()=>{
    document.title = webName+" | Faqs"
    try{
      getFaqs().then((data)=>{
        if(data.success){
          setQuestions(data.faq)
        }
      })
    }catch(err){
      console.log(err);
    }
  },[])
  return (
    <div className={classes.Faq}>
      <h1 className={classes.Faq_Heading}>Frequently Asked Questions?</h1>
      {questions.map((ques, i) => (
        <Question ques={ques} sNo = {i+1} key={i} />
      ))}
    </div>
  );
};
export default FaqContainer;
