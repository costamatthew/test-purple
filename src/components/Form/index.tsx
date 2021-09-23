import { MultipleChoice } from "./Fields/MultipleChoice";
import { Text } from "./Fields/Text";

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

export function FormSurvey({ questions }: QuestionsProps) {
  return (
    <form className={styles.FormContainer}>
      {questions.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.text}</p>

          {item.option_set.map((type) =>
            type.option_type === "OPEN_TEXT" ? (
              <Text />
            ) : (
              <MultipleChoice text={type.text} />
            )
          )}
        </div>
      ))}
    </form>
  );
}
