import { TranslatedAmiibo } from './api.types';
import { Creature } from 'animal-crossing/lib/types/Creature';

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
  onTimerRunningChange: (isRunning: boolean) => void;
  isTimerRunning?: boolean;
}

// 선택된 주민 핸들러
export type AmiiboSelectHandler = (character: string) => void;

// 선택된 주민들
export interface AmiiboSelectionProps {
  selectedAmiibo: string[];
  onSelect: AmiiboSelectHandler;
}

// AmiiboCardList & AmiiboCard : 아미보카드
export interface AmiiboCardListProps extends AmiiboSelectionProps {
  translatedAmiibo: TranslatedAmiibo[];
}

export interface AmiiboCardProps {
  amiibo: TranslatedAmiibo;
  isSelected: boolean;
  onSelect: AmiiboSelectHandler;
}

// 새로받은 보상
export type CreatureExtraInfo = Creature & { isNew?: boolean };
