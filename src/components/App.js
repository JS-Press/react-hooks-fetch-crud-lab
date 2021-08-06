import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [qData, setQData] = useState([]);
  

  function handleDeleteEvent(id) {
    // console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "DELETE"
    })

    const deletedList = qData.filter(question => question.id !== id)
    setQData(deletedList)
  }

  function handleSubmitEvent(formData) {

    // console.log(formData);

      fetch("http://localhost:4000/questions", {
        method : "POST",
        headers : {
           "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "prompt" : formData.prompt,
          "answers" : [formData.answer1, formData.answer2, formData.answer3, formData.answer4], 
          "correctIndex" : formData.correctIndex 
        })
      })



      setQData([ ...qData, formData ])
  
    // setFormData({
    //   prompt: "",
    //   answer1: "",
    //   answer2: "",
    //   answer3: "",
    //   answer4: "",
    //   correctIndex: 0,
    // })
  }

  function handleUpdateEvent(id, value) {
    // console.log(id)
    // console.log(value)
  fetch(`http://localhost:4000/questions/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type" : "application/json"
  },
  body: JSON.stringify({
    "correctIndex": value
    })
  })
  .then(resp=>resp.json()).then((question) => {
    console.log(question)
    //find index of item
    const updatedAnswer = question.correctIndex
    console.log(updatedAnswer)
    //use spread operator to create a copy of the questions array
    const updatedQuestions = [ ...qData ]
    //replace index of the copy with the new question
    updatedQuestions.map(question => {
      if(question.id === id) {
        question.correctIndex = updatedAnswer
      } else {
        return true
      }
    })
    //use setQuestions to update the questions
    setQData(updatedQuestions)
  }
  )
}

// console.log(qData)

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmitEvent = {handleSubmitEvent} /> : <QuestionList handleUpdateEvent = {handleUpdateEvent} handleDel ={handleDeleteEvent} qData ={qData} setQData = {setQData} />}
    </main>
  );
}

export default App;
