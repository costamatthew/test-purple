import { useState, useEffect } from "react";
import { FormSurvey } from "./components/Form";

import { API } from "./services/api";

import "./App.css";

interface OptionSet {
  id: number;
  text: string;
  option_type: string;
  order: number;
  question: number;
}

interface QuestionData {
  id: number;
  name: string;
  text: string;
  order: number;
  option_set: OptionSet[];
}

function App() {
  const [data, setData] = useState<QuestionData[]>([]);

  async function handleApiData() {
    const sortQuestions = API.questions.sort((a, b) => a.order - b.order);
    setData(sortQuestions);
  }

  useEffect(() => {
    handleApiData();
  }, []);

  return (
    <div className="App-header">
      <FormSurvey questions={data} />
    </div>
  );
}

export default App;
