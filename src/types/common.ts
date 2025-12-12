import React from 'react';

// 버튼
export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  children?: React.ReactNode;
  className?: string;
};

// 토글 버튼
export interface ToggleButtonProps extends ButtonProps {
  initialState?: boolean;
  onContent: React.ReactNode;
  offContent: React.ReactNode;
}
