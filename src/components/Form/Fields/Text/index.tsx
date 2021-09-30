import { ChangeEvent } from "react";

interface ItemProps {
  handleText: (type: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Text({ handleText }: ItemProps) {
  return (
    <div>
      <textarea
        className="form-control"
        onChange={(event) => handleText(event)}
      ></textarea>
    </div>
  );
}
