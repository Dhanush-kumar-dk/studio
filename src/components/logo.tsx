import Image from 'next/image';
import logoImg from '../Assest/signal-2025-09-01-172433.jpeg';

export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src={logoImg}
      alt="Debt & Dominion"
      width={32}
      height={32}
      className={`${className} rounded-md object-contain shrink-0`}
      priority
    />
  );
}
