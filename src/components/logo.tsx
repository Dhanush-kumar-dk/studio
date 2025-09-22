import { cn } from '@/lib/utils';
import React from 'react';

type LogoProps = React.SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('fill-current', className)}
      {...props}
    >
        <path d="M62.3,24.9H50.1c-5.9,0-10.7,4.8-10.7,10.7V65c0,5.9,4.8,10.7,10.7,10.7h12.2c5.9,0,10.7-4.8,10.7-10.7v-5.8 c0-5.9-4.8-10.7-10.7-10.7H60c-2.9,0-5.3-2.4-5.3-5.3V35.6C54.7,29.7,58.1,24.9,62.3,24.9z M28.6,35.6v23.6 c0,5.9,4.8,10.7,10.7,10.7h12.3c5.9,0,10.7-4.8,10.7-10.7V35.6c0-5.9-4.8-10.7-10.7-10.7H39.3C33.4,24.9,28.6,29.7,28.6,35.6z M51.6,41.9v17.4c0,2.9-2.4,5.3-5.3,5.3H39.3c-2.9,0-5.3-2.4-5.3-5.3V41.9c0-2.9,2.4-5.3,5.3-5.3h7.1C49.2,36.6,51.6,39,51.6,41.9z" />
    </svg>
  );
}
