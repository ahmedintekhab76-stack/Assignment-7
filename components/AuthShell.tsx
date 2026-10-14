import Link from "next/link";

/** Sign In / Sign Up page এর মাঝখানের ঢাকনা: title, subtitle, card, নিচে "হোমে ফিরে যান" */
export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[448px] flex-col gap-6 px-4 pt-10 pb-12">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="text-sm leading-5 text-base-content/70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>
      <p className="text-center text-sm leading-5 text-base-content/70">
        <Link href="/" className="underline underline-offset-2 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-4" role="separator">
      <span className="h-0.5 flex-1 bg-base-content/10" />
      <span className="text-xs leading-4">অথবা</span>
      <span className="h-0.5 flex-1 bg-base-content/10" />
    </div>
  );
}

export function Field({
  label,
  id,
  ...props
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm leading-[21px] font-medium">
        {label}
      </label>
      <input id={id} name={id} className="input" {...props} />
    </div>
  );
}
