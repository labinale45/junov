import Image from "next/image";
import Link from "next/link";

/** Just the logo, linking home — used where a full navbar would be too much (Tools, Course). */
export function BrandLogo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={`inline-flex shrink-0 rounded-full transition-opacity hover:opacity-80 ${className}`}
    >
      <Image
        src="/Logo.png"
        alt="Rabin Ale"
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    </Link>
  );
}
