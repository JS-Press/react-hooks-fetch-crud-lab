import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"


function QuestionList({ qData, setQData, handleDel, handleUpdateEvent }) {

  

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQData(data))
  }, [])

const qElements = qData.map(q => {
  return <QuestionItem handleUpdateEvent = {handleUpdateEvent} key = {q.id} id = {q.id} answers = {q.answers} prompt ={q.prompt} correctIndex = {q.correctIndex} handleDel ={handleDel} />
})

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qElements}</ul>
    </section>
  );
}

export default QuestionList;
