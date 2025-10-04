export default function Logo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary p-1">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-label="Debt & Dominion Logo"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.75 32.75H43.25V42.5H35.5V67.25H25.75V32.75Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M52.5 32.75H70V42.5H62.25V67.25H52.5V32.75Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
