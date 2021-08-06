import React from "react";

function QuestionItem({ id, prompt, answers, correctIndex, handleDel, handleUpdateEvent }) {
  // const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange = {(e) => handleUpdateEvent(id,e.target.value)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick ={() => handleDel(id)} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
