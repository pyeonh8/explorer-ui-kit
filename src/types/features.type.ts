import { AmiiboProps, TranslatedAmiibo } from './api.types';

export type AmiiboSelectHandler = (character: string) => void;

// AmiiboCardList & AmiiboCard : 아미보카드

export interface AmiiboCardListProps {
  initialAmiibo: AmiiboProps[];
  selectedAmiibo: string[];
  onSelect: AmiiboSelectHandler;
}

export interface AmiiboCardProps {
  amiibo: TranslatedAmiibo;
  isSelected: boolean;
  onSelect: AmiiboSelectHandler;
}

// 모험
export interface Expedition {
  timerTime: string;
  onStart: (start: boolean) => void;
}

// 모험 준비
export interface ExpeditionSetupProps extends AmiiboCardListProps, Expedition {}

// 모험 화면
export type ExpeditionInProgressProps = Expedition;
