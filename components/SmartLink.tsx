import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  follow?: boolean; // true = dofollow (default), false = nofollow
  children: React.ReactNode;
  className?: string;
}

/**
 * SmartLink - Handles internal (dofollow) and external (configurable) links.
 * Internal links use next/link automatically.
 * External links open in _blank with noopener, and nofollow when follow=false.
 */
export default function SmartLink({
  href,
  follow = true,
  children,
  className,
  ...props
}: SmartLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");

  if (isExternal) {
    const rel = [
      "noopener",
      "noreferrer",
      ...(!follow ? ["nofollow"] : []),
    ].join(" ");

    return (
      <a
        href={href}
        target="_blank"
        rel={rel}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link — always dofollow (no rel needed)
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
