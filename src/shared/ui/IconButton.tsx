import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { ButtonProps } from '@/types/common.types';

const IconButton = ({
  children = '',
  className = '',
  ...rest
}: ButtonProps) => {
  const baseStyle = 'flex items-center gap-[4px]';
  const finalClasses = twMerge(baseStyle, className);

  return (
    <Button {...rest} className={finalClasses}>
      {children}
    </Button>
  );
};

export default IconButton;
