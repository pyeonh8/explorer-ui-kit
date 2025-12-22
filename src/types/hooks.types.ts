// 훅 타입들 정리하기

export type BaseData<T> = T[];

// useModal: 모달 훅
export interface useModalProps {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement | null>;
  open?: () => void;
  close: () => void;
}

// useSort: 정렬 훅
export interface sortConfigProps<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}
