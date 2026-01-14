import { Dispatch, SetStateAction } from 'react';
import { TranslatedAmiibo } from './api.types';
import { Creature } from 'animal-crossing/lib/types/Creature';
import { TranslateVillager } from '@/types/api.types';

// 모험 공통
export interface Expedition {
  goalRounds: number;
  onAdventureStart: (start: boolean) => void;
}

// 모험 준비 화면
export interface ExpeditionSetupProps extends AmiiboCardListProps, Expedition {}

// 모험 진행 화면 공통
export interface ExpeditionController {
  isAdventureStarted: boolean;
  collectibleItems: Creature[];
  onTimerRunningChange: (isRunning: boolean) => void;
}

// 모험 진행 화면
export interface ExpeditionInProgressProps
  extends Expedition,
    ExpeditionController {
  isTimerRunning: boolean;
  selectedCharacters: string[];
}

// 캐릭터 선택 화면
export interface CharacterPanelProps {
  selectedCharacters: string[];
  villagers: TranslateVillager[];
  isTimerRunning: boolean;
}

// 뽀모도로 타이머
export type LogType = 'system' | 'animal' | 'npc';

export interface LogEntry {
  type?: LogType;
  name?: string;
  text: string;
  time?: string;
  borderStyle?: 'top' | 'bottom';
}

export interface PomodoroTimerProps extends Expedition, ExpeditionController {
  isTimeOut: boolean;
  setIsTimeOut: (timeOut: boolean) => void;
  setLogs: Dispatch<SetStateAction<LogEntry[]>>;
}

// 선택된 주민 핸들러
export type AmiiboSelectHandler = (character: string) => void;

// 선택된 주민들
export interface AmiiboSelectionProps {
  selectedCharacters: string[];
  onCharacterSelect: AmiiboSelectHandler;
}

// AmiiboCardList & AmiiboCard : 아미보카드
export interface AmiiboCardListProps extends AmiiboSelectionProps {
  translatedAmiibo: TranslatedAmiibo[];
}

export interface AmiiboCardProps {
  amiibo: TranslatedAmiibo;
  isSelected: boolean;
  onCharacterSelect: AmiiboSelectHandler;
}

// 새로받은 보상
export type CreatureExtraInfo = Creature & { isNew?: boolean };
