import { TranslatedAmiibo } from './api.types';
import { Creature } from 'animal-crossing/lib/types/Creature';

export type AmiiboSelectHandler = (character: string) => void;

// 모험
export interface Expedition {
  timerTime: number;
  onStart: (start: boolean) => void;
}

// 모험준비 화면
export interface ExpeditionSetupProps extends AmiiboCardListProps, Expedition {}

// 모험잔행 화면
export interface ExpeditionInProgressProps extends Expedition {
  isStarted: boolean;
  collectibleItems: Creature[];
}

// AmiiboCardList & AmiiboCard : 아미보카드
export interface AmiiboCardListProps {
  translatedAmiibo: TranslatedAmiibo[];
  selectedAmiibo: string[];
  onSelect: AmiiboSelectHandler;
}

export interface AmiiboCardProps {
  amiibo: TranslatedAmiibo;
  isSelected: boolean;
  onSelect: AmiiboSelectHandler;
}
