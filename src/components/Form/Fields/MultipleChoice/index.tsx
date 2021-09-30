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

interface ItemProps {
  register: any;
  errors: any;
  handleChange: (type: OptionSet) => void;
  item: QuestionData;
  type: OptionSet;
}

export function MultipleChoice({
  errors,
  register,
  handleChange,
  item,
  type,
}: ItemProps) {
  return (
    <div className="col-sm-10">
      <input
        className="form-check-input"
        type="radio"
        name={item.name}
        value={type.id}
        {...(register("id"), { required: true })}
        onChange={() => handleChange(type)}
      />
      <label className="form-check-label">{type.text}</label>
      <p>{errors.id?.message}</p>
    </div>
  );
}
