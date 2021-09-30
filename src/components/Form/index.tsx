import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import { MultipleChoice } from "./Fields/MultipleChoice";
import { Text } from "./Fields/Text";

import "bootstrap/dist/css/bootstrap.min.css";
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

interface TakingUserChoices {
  id: number;
  idQuestion?: number;
  text?: string;
}

type SurveyData = {
  id: number;
  text?: string;
};

interface SurveyDataOption {
  option: SurveyData[];
}

export function FormSurvey({ questions }: QuestionsProps) {
  const [takingUserChoices, setTakingUserChoices] = useState<
    TakingUserChoices[]
  >([]);
  const [surveyData, setSurveyData] = useState({} as SurveyDataOption);
  const [openText, setOpenText] = useState("");

  const handleText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOpenText(event.currentTarget.value);
  };

  const handleChange = ({ id, question }: OptionSet) => {
    const anotherOption = takingUserChoices.filter(
      (item) => item.idQuestion !== question
    );

    if (anotherOption) {
      setTakingUserChoices([
        ...anotherOption,
        {
          id: id,
          idQuestion: question,
        },
      ]);

      return;
    }

    setTakingUserChoices([
      ...takingUserChoices,
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

  function submitForm() {
    let data: SurveyData[] = [];
    const lastIndexData = takingUserChoices.length;

    // eslint-disable-next-line
    const removeIdQuestions = takingUserChoices.map((item, index) => {
      if (lastIndexData === index + 1) {
        data.push({ id: item.id, text: openText });
      } else {
        data.push({ id: item.id });
      }
    });

    setSurveyData({ option: [...data] });

    const api = axios.create({
      baseURL:
        "https://www.purplemetrics.com.br/api/v1/save_answers/5c56a367-a16d-47c2-b369-076b7595903c/",
    });

    api
      .post("user=1234", surveyData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => console.log(response));
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.FormContainer}>
      <div className="p-3">
        {questions.map((item) => (
          <div className={styles.GroupRadio} key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.text}</p>

            {item.option_set.map((type) =>
              type.option_type === "OPEN_TEXT" ? (
                <Text key={`${item.id}: ${type.id}`} handleText={handleText} />
              ) : (
                <MultipleChoice
                  key={`${item.id}: ${type.id}`}
                  item={item}
                  type={type}
                  register={register}
                  handleChange={handleChange}
                  errors={errors}
                />
              )
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-success btn-lg">
          Enviar
        </button>
      </div>
    </form>
  );
}
