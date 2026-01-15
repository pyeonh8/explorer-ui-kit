import { twMerge } from 'tailwind-merge';
import Button from '../Button';
import { ButtonProps } from '@/types/common.types';
import { TbHandFingerRight } from 'react-icons/tb';
import { BsFillCaretRightFill } from 'react-icons/bs';

const ModalButton = ({
  children = '',
  className = '',
  onClick,
  ...rest
}: ButtonProps) => {
  const baseStyle =
    'flex items-center border-none bg-(--color-foreground-subtle) font-bold hover:bg-(--color-foreground-subtle) hover:text-(--color-font) group';
  const finalClasses = twMerge(baseStyle, className);

  return (
    <Button {...rest} onClick={onClick} className={finalClasses}>
      <span aria-hidden="true" className="flex h-[18px] w-4 overflow-hidden">
        <BsFillCaretRightFill className="w-6 group-hover:w-0" />
        <TbHandFingerRight className="w-0 opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100" />
      </span>

      <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:z-0 after:h-3/7 after:w-full after:rounded-2xl after:bg-amber-300/0 after:transition-all after:duration-300 after:content-[''] group-hover:after:bg-amber-300">
        <span className="relative z-10 p-1 text-[16px]">{children}</span>
      </span>
    </Button>
  );
};

export default ModalButton;
