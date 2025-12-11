import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { IconButtonProps } from '@/types/common';

const IconButton = ({
  children = '',
  className = '',
  ...rest
}: IconButtonProps) => {
  const baseStyle = '';
  const finalClasses = twMerge(baseStyle, className);

  return (
    <Button {...rest} className={finalClasses}>
      {children}
    </Button>
  );
};

export default IconButton;
