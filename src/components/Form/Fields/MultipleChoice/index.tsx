import { RegisterOptions } from "react-hook-form";
import styles from "./Styles.module.scss";

interface TextProps {
  text: string;
  register: RegisterOptions;
}

export function MultipleChoice({ text }: TextProps) {
  return (
    <div className={styles.Container}>
      <input type="checkbox" />
      <label>{text}</label>
    </div>
  );
}

{
  /* <input
          ref={register({ required: 'This is required' })}
          name="example_1"
          value={true}
          type="checkbox"
        /> */
}
