import IconButton from './IconButton';
import { ToggleButtonProps } from '@/types/common.types';
import useToggle from '../hooks/useToggle';
import { twMerge } from 'tailwind-merge';

const ToggleButton = ({
  className = '',
  initialState,
  onContent,
  offContent,
  ...rest
}: ToggleButtonProps) => {
  const { toggle, value } = useToggle(initialState);

  const toggleStyle = value ? 'border-t-[4px] border-b-[4px]' : '';
  const finalClass = twMerge(toggleStyle, className);

  return (
    <IconButton {...rest} onClick={toggle} className={finalClass}>
      {value ? onContent : offContent}
    </IconButton>
  );
};

export default ToggleButton;
