import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFormProps {
  label: string;
  placeholder?: string;
  children: ReactNode;
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

export default function SelectForm({
  label,
  placeholder = "Select an option",
  children,
  disabled,
  value,
  onChange,
}: SelectFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Select value={value} disabled={disabled} onValueChange={onChange}>
        <SelectTrigger className="w-full py-5">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}
