import { twMerge } from 'tailwind-merge';
import Button from '../Button';
import { ButtonProps } from '@/types/common.types';
import { TbHandFingerRight } from 'react-icons/tb';
import { BsFillCaretRightFill } from 'react-icons/bs';
import useToggle from '../../hooks/useToggle';

const ModalButton = ({
  children = '',
  className = '',
  ...rest
}: ButtonProps) => {
  const { value, toggle } = useToggle();

  const baseStyle =
    'flex items-center border-none bg-[var(--color-foreground-subtle)] font-bold';
  const finalClasses = twMerge(baseStyle, className);

  return (
    <Button
      {...rest}
      className={finalClasses}
      onMouseEnter={toggle}
      onMouseLeave={toggle}
    >
      {value ? <TbHandFingerRight /> : <BsFillCaretRightFill />}
      <span
        className={
          value
            ? `relative inline-block after:absolute after:bottom-0 after:left-0 after:z-0 after:h-3/7 after:w-full after:rounded-2xl after:bg-amber-300 after:content-['']`
            : ``
        }
      >
        <span className="relative z-10 p-1 text-[16px]">{children}</span>
      </span>
    </Button>
  );
};

export default ModalButton;
