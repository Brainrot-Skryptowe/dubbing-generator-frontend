import * as React from "react";
import { cn } from "@/lib/utils";

interface ItemWithIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  label: string;
}

function ItemWithIcon({ icon, label, className, ...props }: ItemWithIconProps) {
  return (
    <div
      className={cn("flex-1 flex flex-col items-center gap-2", className)}
      {...props}
    >
      {icon}
      <p>{label}</p>
    </div>
  );
}

export { ItemWithIcon };
