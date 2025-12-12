import IconButton from './IconButton';
import { ToggleButtonProps } from '@/types/common';
import useToggle from '../hooks/useToggle';

const ToggleButton = ({
  className = '',
  initialState,
  onContent,
  offContent,
  ...rest
}: ToggleButtonProps) => {
  const { toggle, value } = useToggle(initialState);

  return (
    <IconButton {...rest} onClick={toggle} className={className}>
      {value ? onContent : offContent}
    </IconButton>
  );
};

export default ToggleButton;
