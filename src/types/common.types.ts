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

// ModalProps: 모달
export interface ModalProps {
  children?: ReactNode;
  actionButton?: ReactNode;
  openButton?: (open: () => void) => ReactNode;
  hideCloseButton?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

// ModalContent: 모달 컨텐츠
export interface ModalContentProps
  extends UseModalProps,
    Omit<ModalProps, 'isOpen'> {}

// ItemGridProps: 도감 및 보상 UI
export interface ItemGridProps {
  children: React.ReactNode;
  columns?: number;
}
