import logoImg from "@/assets/new-logo.jpg";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logoImg}
        alt="Logo"
        className={cn(`rounded-full`, className)}
        width={40}
        height={40}
        priority
      />
      <span className="font-semibold text-lg">Sugary</span>
    </div>
  );
}
