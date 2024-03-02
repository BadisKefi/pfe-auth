"use client";
import LogoPackedInDark from "@/public/logo-packedin-dark.png";
import LogoPackedIn from "@/public/logo-packedin.png";
import LogoPackedInSquareDark from "@/public/logo-packedin-square-dark.png";
import LogoPackedInSquare from "@/public/logo-packedin-square.png";

import { useTheme } from "next-themes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size: "sm" | "lg";
}

export function Logo({ size, className }: LogoProps) {
  const { theme, systemTheme } = useTheme();
  function extractLogoFromPureTheme(
    t: string | undefined,
    st: string | undefined,
    c?: boolean
  ): StaticImport {
    if ((t === "system" && st === "dark") || t === "dark")
      return (!c ? LogoPackedInDark : LogoPackedInSquareDark) as StaticImport;
    if ((t === "system" && st === "light") || t === "light")
      return (!c ? LogoPackedIn : LogoPackedInSquare) as StaticImport;
    return LogoPackedIn;
  }
  return (
    <Image
      src={extractLogoFromPureTheme(theme, systemTheme, size === "sm")}
      width={LogoPackedIn.width}
      height={LogoPackedIn.height}
      className={className}
      alt={"LogoPackedIn"}
    />
  );
}
