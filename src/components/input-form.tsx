import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFormProps {
  name: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputForm({
  name,
  placeholder = "",
  type = "text",
  disabled = false,
  value,
  onChange,
}: InputFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div>
      <Label className="mb-2">{name}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        className="py-5"
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
