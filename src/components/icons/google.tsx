export default function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 22c-2.29 0-4.42-.76-6.14-2.05" />
      <path d="M12 2a10 10 0 0 1 8.19 4.02" />
      <path d="M2.05 18.14A10 10 0 0 1 12 2" />
      <path d="M12 2a10 10 0 0 0-8.19 14.02" />
      <path d="M16 8c-1.333-1.333-2.667-2-4-2s-2.667.667-4 2" />
      <path d="M18 14c-1.333.667-2.667 1-4 1s-2.667-.333-4-1" />
    </svg>
  );
}
