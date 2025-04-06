import { ReactNode, MouseEvent } from "react";

interface IButtonProps {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className: string;
}

export default function Button({ children, onClick, className }: IButtonProps) {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
