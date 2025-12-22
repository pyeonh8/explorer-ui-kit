import React from 'react';
import { UseModalProps } from './hooks.types';

type ReactNode = React.ReactNode;

// Button: 버튼
export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  children?: ReactNode;
  className?: string;
};

// ToggleButton: 토글 버튼
export interface ToggleButtonProps extends ButtonProps {
  initialState?: boolean;
  onContent: ReactNode;
  offContent: ReactNode;
}

// ModalContent: 모달 컨텐츠
export interface ModalContentProps extends UseModalProps {
  children?: ReactNode;
}
