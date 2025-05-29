import Link from "next/link";

export default function LinkForm({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="text-center text-sm font-bold hover:underline mt-2"
    >
      {title}
    </Link>
  );
}
