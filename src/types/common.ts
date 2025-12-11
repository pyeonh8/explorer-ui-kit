import React from 'react';

//버튼
export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  children?: React.ReactNode;
  className?: string;
};

//아이콘 버튼
export interface IconButtonProps extends ButtonProps {
  icon?: string;
}
