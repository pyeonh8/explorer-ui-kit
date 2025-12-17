import { AmiiboProps } from './api.types';
// 훅 타입들 정리하기

// useModal: 모달 훅
export interface useModalProps {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement | null>;
  open?: () => void;
  close: () => void;
}

// useAmiibos: 동물의 숲 아미보 카드 데이터 훅
export interface useAmiibosProps {
  finalAmiibo: AmiiboProps[];
  isLoading: boolean;
  error: string | null;
}
