import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import styles from "./Styles.module.scss";

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

interface QuestionsProps {
  questions: QuestionData[];
}

interface SendQuestionBody {
  id: number;
  text?: string;
}

interface Teste {
  id: number;
  idQuestion?: number;
  text?: string;
}

type TesteFinal = {
  id: number;
  text?: string;
};

interface TesteO {
  option: TesteFinal[];
}

export function FormSurvey({ questions }: QuestionsProps) {
  const [json, setJson] = useState<Teste[]>([]);
  const [openText, setOpenText] = useState("");
  const [jsonFinal, setJsonFinal] = useState({} as TesteO);

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenText(event.currentTarget.value);
  };

  useEffect(() => {
    console.log(jsonFinal);
  }, [jsonFinal]);

  const handleChange = ({ id, question }: OptionSet) => {
    const anotherOption = json.filter((item) => item.idQuestion !== question);

    if (anotherOption) {
      setJson([
        ...anotherOption,
        {
          id: id,
          idQuestion: question,
        },
      ]);

      return;
    }

    setJson([
      ...json,
      {
        id: id,
        idQuestion: question,
      },
    ]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendQuestionBody>();

  async function submitForm() {
    let data: TesteFinal[] = [];
    const lastIndexJson = json.length;
    // eslint-disable-next-line
    const removeIdQuestions = json.map((item, index) => {
      if (lastIndexJson === index + 1) {
        data.push({ id: item.id, text: openText });
      } else {
        data.push({ id: item.id });
      }
    });

    setJsonFinal({ option: [...data] });

    console.log("final", jsonFinal);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.FormContainer}>
      {questions.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>{item.text}</p>
          <label htmlFor={item.name}>
            {item.option_set.map((type) =>
              type.option_type === "OPEN_TEXT" ? (
                <div key={`${item.id}: ${type.id}`}>
                  <input type="text" onChange={(event) => handleText(event)} />
                </div>
              ) : (
                <div key={`${item.id}: ${type.id}`}>
                  <input
                    key={`${item.id}: ${type.id}`}
                    type="radio"
                    {...(register("id"), { required: true })}
                    onChange={() => handleChange(type)}
                    name={item.name}
                    value={type.id}
                  />
                  <p>{type.text}</p>
                  <p>{errors.id?.message}</p>
                </div>
              )
            )}
          </label>
        </div>
      ))}
      <button type="submit">Teste</button>
    </form>
  );
}
