import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ButtonFormProps {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  imageSrc?: string;
  type?: "button" | "submit" | "reset";
}

export default function ButtonForm({
  onClick,
  disabled = false,
  title,
  imageSrc,
  type,
}: ButtonFormProps) {
  if (imageSrc) {
    return (
      <Button
        variant="secondary"
        onClick={onClick}
        type={type}
        className="relative py-5 rounded-full font-bold text-sm border-2 border-text-foreground hover:text-secondary-foreground/70"
        disabled={disabled}
      >
        <Image
          src={imageSrc}
          alt="Button Icon"
          height="18"
          width="18"
          className="absolute left-5"
        />
        <span>{title}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      className="py-5 rounded-full font-bold text-sm"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
