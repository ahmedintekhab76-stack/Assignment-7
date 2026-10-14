/** user এর ছবি; ছবি না থাকলে নামের প্রথম অক্ষর দেখায় */
export default function Avatar({
  name,
  image,
  size = 36,
  radius = 10.5,
}: {
  name: string;
  image?: string | null;
  size?: number;
  radius?: number;
}) {
  const style = { width: size, height: size, borderRadius: radius };
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        style={style}
        className="shrink-0 bg-base-200 object-cover"
      />
    );
  }
  return (
    <span
      style={{ ...style, fontSize: size * 0.45 }}
      className="inline-flex shrink-0 items-center justify-center bg-primary font-semibold text-primary-content"
      aria-label={name}
    >
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}
