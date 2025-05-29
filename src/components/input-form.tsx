import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface InputFormProps {
  name: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function InputForm({
  name,
  placeholder = "",
  type = "text",
  disabled = false,
  onChange,
}: InputFormProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div>
      <Label className="mb-4">{name}</Label>
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
