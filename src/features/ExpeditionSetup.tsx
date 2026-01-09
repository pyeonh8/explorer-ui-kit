import AmiiboCardList from './amiibo/AmiiboCardList';

import Modal from '@/shared/ui/modal/Modal';

import IconButton from '@/shared/ui/IconButton';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { PiTimerBold } from 'react-icons/pi';
import { ExpeditionSetupProps } from '@/types/features.type';
import { IoIosWarning } from 'react-icons/io';
import { RxLapTimer } from 'react-icons/rx';
import SelectedVillagers from './amiibo/SelectedVillagers';

// 탐험 준비 화면
const ExpeditionSetup = ({
  translatedAmiibo,
  selectedAmiibo,
  onSelect,
  timerTime,
  onStart,
}: ExpeditionSetupProps) => {
  const notChoice = selectedAmiibo.length === 0;

  return (
    <>
      {/*  */}
      <SelectedVillagers selectedAmiibo={selectedAmiibo} onSelect={onSelect} />

      {/*  */}
      <Modal
        openButton={(open) => (
          <IconButton onClick={open}>
            <PiTimerBold /> 모험 시작!
          </IconButton>
        )}
        actionButton={
          !notChoice && (
            <ModalButton onClick={() => onStart(true)}>타이머 시작</ModalButton>
          )
        }
      >
        <div className="flex flex-col items-center gap-3 whitespace-pre-line">
          {!notChoice ? (
            <>
              <RxLapTimer className="text-3xl text-[var(--color-accent)]" />
              <ul>
                <li className="font-bold">{`${timerTime}회 동안 모험이 시작됩니다!`}</li>
                <li className="text-[16px]">{`${25 * timerTime}분 집중과 ${5 * timerTime}분 휴식이 준비되어 있습니다.`}</li>
              </ul>
            </>
          ) : (
            <>
              <IoIosWarning className="text-3xl text-orange-700" />
              <span>
                최소 <span className="font-black text-orange-700">1명</span>의
                캐릭터를 선택해주세요.
              </span>
            </>
          )}
        </div>
      </Modal>

      <AmiiboCardList
        translatedAmiibo={translatedAmiibo}
        selectedAmiibo={selectedAmiibo}
        onSelect={onSelect}
      />
    </>
  );
};

export default ExpeditionSetup;
