import AmiiboCardList from './amiibo/AmiiboCardList';
import SelectedVillagers from './amiibo/SelectedVillagers';
import Modal from '@/shared/ui/modal/Modal';
import IconButton from '@/shared/ui/IconButton';
import ModalButton from '@/shared/ui/modal/ModalButton';
import { ExpeditionSetupProps } from '@/types/features.type';
import { IoIosWarning } from 'react-icons/io';
import { RxLapTimer } from 'react-icons/rx';
import { RiLeafFill } from 'react-icons/ri';

// 탐험 준비 화면
const ExpeditionSetup = ({
  goalRounds,
  onAdventureStart,
  translatedAmiibo,
  selectedCharacters,
  onCharacterSelect,
}: ExpeditionSetupProps) => {
  const notChoice = selectedCharacters.length === 0;

  return (
    <>
      {/* 선택한 캐릭터 */}
      <SelectedVillagers
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
      />

      {/* 모험 시작 버튼 */}
      <Modal
        openButton={(open) => (
          <IconButton
            className="m-auto min-h-[55px] w-[200px] max-w-full text-[20px] font-bold sm:min-h-[60px] sm:text-[23px]"
            onClick={open}
          >
            <RiLeafFill /> 모험 Start !
          </IconButton>
        )}
        actionButton={
          !notChoice && (
            <ModalButton onClick={() => onAdventureStart(true)}>
              타이머 시작
            </ModalButton>
          )
        }
      >
        <div className="flex flex-col items-center gap-3 whitespace-pre-line">
          {!notChoice ? (
            <>
              <RxLapTimer className="text-3xl text-(--color-accent)" />
              <ul>
                <li className="font-bold">{`${goalRounds}회 동안 모험이 시작됩니다!`}</li>
                <li className="text-[16px]">{`${25 * goalRounds}분 집중과 ${5 * goalRounds}분 휴식이 준비되어 있습니다.`}</li>
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
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
      />
    </>
  );
};

export default ExpeditionSetup;
