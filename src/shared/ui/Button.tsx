import { twMerge } from 'tailwind-merge';
import { ButtonProps } from '@/types/common';

const Button = ({ children = '', className = '', ...rest }: ButtonProps) => {
  const baseStyle =
    'transform cursor-pointer rounded-2xl border-x-3 border-t-[1px] border-b-[7px] border-[var(--color-primary)] bg-white p-2 hover:border-t-[4px] hover:border-b-[4px]';

  const finalClasses = twMerge(baseStyle, className);

  return (
    <button {...rest} className={finalClasses}>
      {children}
    </button>
  );
};

export default Button;
