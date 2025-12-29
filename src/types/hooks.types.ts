type CallbackProp = () => void;

// useClickOutside : 바깥 영역 클릭 훅
export interface UseClickOutsideProps {
  ref: React.RefObject<HTMLElement | null>;
  callback: CallbackProp;
}

// useCounter : 카운터 훅
export interface UseCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
}

// useModal: 모달 훅
export interface UseModalProps {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement | null>;
  open?: CallbackProp;
  close: CallbackProp;
}

// useSort: 정렬 훅
export interface SortConfigProps<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}

// useSound: 사운드 훅
export interface UseSoundProps {
  src?: string;
  volume?: number;
  loop?: boolean;
}

// useTimer: 타이머 훅
export interface UseTimerProps {
  initialValue?: number;
  delay?: number;
  max?: number;
  onComplete?: CallbackProp;
}
