import { AmiiboProps } from '@/types/api.types';
import AmiiboCardList from './AmiiboCardList';

// 탐험 준비 화면
const ExpeditionSetup = ({
  initialAmiibo,
}: {
  initialAmiibo: AmiiboProps[];
}) => {
  return <AmiiboCardList initialAmiibo={initialAmiibo} />;
};

export default ExpeditionSetup;
