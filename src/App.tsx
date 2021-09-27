import { useState, useEffect } from "react";
import { FormSurvey } from "./components/Form";

import { api } from "./services/api";

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
  const [get, setGet] = useState<QuestionData[]>([]);

  useEffect(() => {
    const sortQuestions = api.questions.sort((a, b) => a.order - b.order);
    setGet(sortQuestions);
  }, []);

  return (
    <div className="App-header">
      <FormSurvey questions={get} />
    </div>
  );
}

export default App;
