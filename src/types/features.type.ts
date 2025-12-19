import { AmiiboProps } from './api.types';

// AmiiboCardList & AmiiboCard : 아미보카드
export type AmiiboSelectHandler = (character: string) => void;

export interface AmiiboCardListProps {
  initialAmiibo: AmiiboProps[];
  selectedAmiibo: string[];
  onSelect: AmiiboSelectHandler;
}

export interface AmiiboCardProps {
  amiibo: AmiiboProps;
  selectedAmiibo: boolean;
  onSelect: AmiiboSelectHandler;
}
