import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { ButtonProps } from '@/types/common.types';

const IconButton = ({
  children = '',
  className = '',
  variant = 'default',
  ...rest
}: ButtonProps) => {
  const baseStyle =
    variant === 'plain' ? '' : 'flex items-center gap-[4px] justify-center';
  const finalClasses = twMerge(baseStyle, className);

  return (
    <Button {...rest} className={finalClasses}>
      {children}
    </Button>
  );
};

export default IconButton;
