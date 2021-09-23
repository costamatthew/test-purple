import styles from "./Styles.module.scss";

interface TextProps {
  text: string;
}

export function MultipleChoice({ text }: TextProps) {
  return (
    <div className={styles.Container}>
      <input type="checkbox" />
      <p>{text}</p>
    </div>
  );
}
