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
    await API.get("/user=1234?fields=them").then((response) => {
      setData(
        response.data.questions.sort((a: any, b: any) => a.order - b.order)
      );
    });
  }

  useEffect(() => {
    handleApiData();
    console.log(data);
  }, []);

  return (
    <div className="App-header">
      <FormSurvey questions={data} />
    </div>
  );
}

export default App;
