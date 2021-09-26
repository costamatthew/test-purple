import { useState, useRef } from "react";
import * as yup from "yup";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

type SendQuestionBody = {
  id: number;
  text?: string;
};

// interface SendQuestionBody {
//   id: boolean;
//   text?: string;
// }

type SendQuestion = {
  options: SendQuestionBody[];
};

export function FormSurvey({ questions }: QuestionsProps) {
  let schema = yup.object().shape({
    options: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number(),
        })
      )
      .required("Must choose at least one option."),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const submitForm = (data: SendQuestionBody) => {
    console.log("Submission", data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.FormContainer}>
      {questions.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>{item.text}</p>
          <label htmlFor={item.name}>
            {item.option_set.map((type) =>
              type.option_type === "OPEN_TEXT" ? (
                <input type="text" />
              ) : (
                <>
                  <input
                    {...register("id")}
                    type="radio"
                    name={item.name}
                    value={type.id}
                  />
                  <p>{type.text}</p>
                </>
              )
            )}
          </label>
        </div>
      ))}
      <button type="submit">Teste</button>
    </form>
  );
}
