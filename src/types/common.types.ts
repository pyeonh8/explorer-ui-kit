import React from 'react';
import { useModalProps } from './hooks.types';

// Button: 버튼
export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  children?: React.ReactNode;
  className?: string;
};

// ToggleButton: 토글 버튼
export interface ToggleButtonProps extends ButtonProps {
  initialState?: boolean;
  onContent: React.ReactNode;
  offContent: React.ReactNode;
}

// ModalContent: 모달 컨텐츠
export interface ModalContentProps extends useModalProps {
  children?: React.ReactNode;
}
