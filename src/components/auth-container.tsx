export default function AuthContainer({
  children,
  onSubmit,
  title,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 w-104 p-6 bg-secondary text-secondary-foreground rounded-2xl border-1 border-secondary-foreground"
    >
      <h2 className="text-2xl font-bold text-center my-3">{title}</h2>
      {children}
    </form>
  );
}
