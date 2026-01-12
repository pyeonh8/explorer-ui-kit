import { TranslatedAmiibo } from './api.types';
import { Creature } from 'animal-crossing/lib/types/Creature';

// 모험 공통
export interface Expedition {
  timerTime: number;
  onStart: (start: boolean) => void;
}

// 모험 준비 화면
export interface ExpeditionSetupProps extends AmiiboCardListProps, Expedition {}

// 모험 진행 화면 공통
export interface ExpeditionController {
  isStarted: boolean;
  collectibleItems: Creature[];
  onTimerRunningChange: (isRunning: boolean) => void;
}

// 모험 진행 화면
export interface ExpeditionInProgressProps
  extends Expedition,
    ExpeditionController {
  isTimerRunning: boolean;
  selectedAmiibo: string[];
}

// 뽀모도로 타이머
export interface PomodoroTimerProps extends Expedition, ExpeditionController {
  isTimeOut: boolean;
  setIsTimeOut: (timeOut: boolean) => void;
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
