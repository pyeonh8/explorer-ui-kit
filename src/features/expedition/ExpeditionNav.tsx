import IconButton from '@/shared/ui/IconButton';
import CollectionsModal from './components/CollectionsModal';
import useExpeditionBgm from './components/useExpeditionBgm';
import { MdMusicNote } from 'react-icons/md';
import { MdMusicOff } from 'react-icons/md';
import { ExpeditionNavProps } from '@/types/features.type';

const ExpeditionNav = ({
  isBgmEnabled,
  setIsBgmEnabled,
  isAdventureStarted,
  isTimerFinished,
}: ExpeditionNavProps) => {
  // 배경음악
  useExpeditionBgm({
    isBgmEnabled,
    isAdventureStarted,
    isTimerFinished,
  });

  return (
    <nav className="flex flex-col gap-1.5">
      {/* 배경음악 On/Off 버튼 */}
      <IconButton
        onClick={() => {
          setIsBgmEnabled((prev) => !prev);
        }}
      >
        <span className="text-[22px] sm:text-[22px]">
          {isBgmEnabled ? <MdMusicNote /> : <MdMusicOff />}
        </span>
        <span className="hidden text-[12px] font-bold whitespace-nowrap sm:block">
          음악
        </span>
      </IconButton>

      {/* 내 도감 */}
      <CollectionsModal isAdventureStarted={isAdventureStarted} />
    </nav>
  );
};

export default ExpeditionNav;
