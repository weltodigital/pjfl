import { cn } from "@/lib/utils";

import logoDark from "@/assets/pjfl-logo.png";
import logoLight from "@/assets/pjfl-logo-light.png";

/**
 * The PJFL wordmark. Two variants are generated from the client's master
 * artwork (`PJFL.logo.png` in the project root) with the solid blue field
 * keyed out, so the mark sits cleanly on any background:
 *   - "dark"  — brand-blue type, for white / ivory backgrounds
 *   - "light" — ivory type, for the navy footer
 */
type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

const Logo = ({ variant = "dark", className }: LogoProps) => (
  <img
    src={variant === "light" ? logoLight : logoDark}
    alt="PJFL Accountants"
    width={668}
    height={182}
    className={cn("h-10 w-auto", className)}
  />
);

export default Logo;
