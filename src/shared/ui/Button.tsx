import { twMerge } from 'tailwind-merge';
import { ButtonProps } from '@/types/common.types';
import useSoundEffect from '../hooks/useSoundEffect';

const Button = ({
  children = '',
  className = '',
  variant = 'default',
  onClick,
  ...rest
}: ButtonProps) => {
  const { play } = useSoundEffect({ src: '/sounds/sfx-click.mp3' });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    play();
    if (onClick) onClick(e);
  };

  const baseStyle =
    variant === 'plain'
      ? 'cursor-pointer'
      : 'transform cursor-pointer rounded-2xl border-x-3 border-t-[1px] border-b-[7px] border-(--color-primary) bg-white p-2 hover:border-t-[4px] hover:border-b-[4px] transition-all min-h-[46px] hover:bg-(--color-accent) hover:text-white ';

  const finalClasses = twMerge(baseStyle, className);

  return (
    <button
      type="button"
      {...rest}
      onClick={handleClick}
      className={finalClasses}
    >
      {children}
    </button>
  );
};

export default Button;
