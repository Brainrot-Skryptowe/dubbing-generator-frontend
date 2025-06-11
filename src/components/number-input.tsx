import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NumberInputFormProps {
  label: string;
  placeholder?: string;
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberInputForm({
  label,
  placeholder = "Wprowadź liczbę",
  value,
  onChange,
  disabled,
  min,
  max,
  step,
}: NumberInputFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        type="number"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="py-5"
      />
    </div>
  );
}
